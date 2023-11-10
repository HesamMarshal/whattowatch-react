import "./Movie.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Banner from "./Banner";
import Casts from "./Casts";
import WatchProvider from "./WatchProvider";
import { API_KEY, BASE_URL, TRAKT_API_KEY } from "../../Utils/utils";

// TMDB

function Movie() {
  const [movie, setMovie] = useState({});
  const [casts, setCasts] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [watchProvider, setWatchProvider] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const baseURL = BASE_URL;

  // onMount
  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieURL = BASE_URL + `/movie/${id}?language=en-US;&` + API_KEY;
        const movieCreditsURL =
          baseURL + `/movie/${id}/credits?language=en-US&` + API_KEY;

        const watchProviderURL =
          baseURL + `/movie/${id}/watch/providers?language=en-US;&` + API_KEY;

        setIsLoading(true);

        const { data } = await axios.get(movieURL);

        setMovie(data);

        const { data: movieCredits } = await axios.get(movieCreditsURL);
        setCasts(movieCredits.cast);
        setDirectors(
          movieCredits.crew.filter((item) => item.job === "Director")
        );
        setWriters(movieCredits.crew.filter((item) => item.job === "Writer"));

        const { data: watchProviderList } = await axios.get(watchProviderURL);
        setWatchProvider(watchProviderList.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, []);

  return (
    <div className="singleMovie">
      <Banner
        movie={movie}
        isLoading={isLoading}
        directors={directors}
        writers={writers}
      />
      <div className="extraDetails">
        <div className="movieSidebar">
          <WatchProvider providerList={watchProvider} />
        </div>
        <div className="moviePannel">
          <Casts casts={casts} />
        </div>
      </div>
    </div>
  );
}

export default Movie;
