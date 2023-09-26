import "./NewMoviesList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import imagePlaceholder from "../assets/images/placeholder.jpg";

// TMDB

const API_KEY = "api_key=01c09651636453d932a88c8d279f48a9";
const client_id =
  "217c9bb60bb9d0a2783c13d5c288a393cf900e0e7f41232071bfba977b2a73a5";
const baseURL = "https://api.themoviedb.org/3";

// const API_URL = baseURL + "/discover/movie?sort_by=popularity.desc&language=fa&" + API_KEY;
// const seriesURL = baseURL + "/discover/tv?sort_by=popularity.desc&" + API_KEY;

const seriesURL = "https://api.trakt.tv/shows/trending";
// baseURL +
// "/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&" +
// API_KEY;

// const SEARCH_URL = baseURL + "/search/movie?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function NewSeriesList() {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // On Load
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": [client_id],
      },
    };

    async function fetchMovies() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(seriesURL, config);
        // console.log(data);
        setSeries(data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  function getColor(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  if (isLoading) return <Loading />;
  return (
    <section id="new-movie-list">
      {series.map((serie) => {
        // console.log(serie);
        const { watchers, show } = serie;
        const poster_path = "";
        return (
          <div className="movie" key={show.ids.imdb}>
            <img
              src={poster_path ? IMG_URL + poster_path : imagePlaceholder}
              alt={show.title}
            />
            <div className="movieInfo">
              <h3>{show.title}</h3>
              <span className="green">{watchers}</span>
              <div className="overview">
                <h3>Overview</h3>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default NewSeriesList;

{
}
