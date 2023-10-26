import "./Movie.css";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import justWatch from "../../assets/images/justwatch-logo.svg";
import Banner from "./Banner";
import Casts from "./Casts";

// TMDB
const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_BASE_URL;

// const searchURL = baseURL + "/search/movie?" + API_KEY;
const imageURL = "https://image.tmdb.org/t/p/w500/";

function Movie() {
  const [movie, setMovie] = useState({});
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
        const movieURL = baseURL + `/movie/${id}?language=en-US;&` + API_KEY;
        const movieCreditsURL =
          baseURL + `/movie/${id}/credits??language=en-US&` + API_KEY;

        // https://api.themoviedb.org/3/movie/603/watch/providers
        const watchProviderURL =
          baseURL + `/movie/${id}/watch/providers?language=en-US;&` + API_KEY;

        setIsLoading(true);

        const { data } = await axios.get(movieURL);
        // console.log(data);

        setMovie(data);

        const { data: movieCredits } = await axios.get(movieCreditsURL);
        setCasts(movieCredits.cast);
        setDirectors(
          movieCredits.crew.filter((item) => item.job === "Director")
        );
        setWriters(movieCredits.crew.filter((item) => item.job === "Writer"));

        const { data: watchProviderList } = await axios.get(watchProviderURL);
        // console.log(watchProviderList.results);
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

function WatchProvider({ providerList }) {
  return (
    <div className="watchProvider">
      {/* <h3>Watch provider</h3> */}
      <img src={justWatch} alt="justWatch" className="justWatch" />
      <div className="providersList">
        {Object.entries(providerList).map((provider) => {
          const rentProvider = provider[1].rent;

          return (
            <div key={provider[0]} className="providerCountry">
              <div className="providerCountryName">
                Country:{" "}
                <ReactCountryFlag
                  svg
                  countryCode={provider[0]}
                  alt={provider[0]}
                />
              </div>
              <div className="rentProvider">
                {rentProvider?.map((rent) => (
                  <img
                    className="providerLogo"
                    src={imageURL + rent.logo_path}
                    alt={rent.provider_name}
                    key={rent.provider_name}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
