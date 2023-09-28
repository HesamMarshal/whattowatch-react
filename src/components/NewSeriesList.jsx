import "./NewMoviesList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import imagePlaceholder from "../assets/images/placeholder.jpg";

// TMDB

const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";
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

    async function fetchSeries() {
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

    fetchSeries();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <section id="new-movie-list">
      {series.map((serie) => {
        return <Series serie={serie} key={serie.show.ids.tmdb} />;
      })}
    </section>
  );
}

export default NewSeriesList;

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
function Series({ serie }) {
  // console.log(serie);
  const { watchers, show } = serie;
  const poster_path = "";
  return (
    <div className="movie">
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
}
