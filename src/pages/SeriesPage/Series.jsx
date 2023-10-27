import "./Series.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SeriesBanner from "./SeriesBanner";
import { BASE_URL } from "../../Utils/utils";
// import Casts from "./Casts";
// import WatchProvider from "./WatchProvider";

// TMDB
const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = BASE_URL;
// /series_id?language=en-US'

function Series() {
  const [serie, setSerie] = useState({});
  const [casts, setCasts] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [watchProvider, setWatchProvider] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // onMount
  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieURL = baseURL + `/tv/${id}?language=en-US;&` + API_KEY;
        const movieCreditsURL =
          baseURL + `/tv/${id}/credits??language=en-US&` + API_KEY;

        const watchProviderURL =
          baseURL + `/tv/${id}/watch/providers?language=en-US;&` + API_KEY;

        setIsLoading(true);

        const { data } = await axios.get(movieURL);

        console.log(data);
        setSerie(data);

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
      <SeriesBanner
        serie={serie}
        isLoading={isLoading}
        directors={directors}
        writers={writers}
      />
      <div className="extraDetails">
        <div className="movieSidebar">
          Watch Provider
          {/* <WatchProvider providerList={watchProvider} /> */}
        </div>
        <div className="moviePannel">
          Casts
          {/* <Casts casts={casts} /> */}
        </div>
      </div>
    </div>
  );
}

export default Series;
