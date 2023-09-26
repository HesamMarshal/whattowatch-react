import "./NewMoviesList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import imagePlaceholder from "../assets/images/placeholder.jpg";

// TMDB

const API_KEY = "api_key=01c09651636453d932a88c8d279f48a9";
const BASE_URL = "https://api.themoviedb.org/3";
// const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&language=fa&" + API_KEY;
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function NewMoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // On Load
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(API_URL);
        console.log(data.results);
        setMovies(data.results.slice(0, 3));
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
      {movies.map((movie) => {
        const { id, title, poster_path, vote_average, overview } = movie;
        return (
          <div className="movie" key={id}>
            <img
              src={poster_path ? IMG_URL + poster_path : imagePlaceholder}
              alt={title}
            />
            <div className="movieInfo">
              <h3>{title}</h3>
              <span className={getColor(vote_average)}>{vote_average}</span>
              <div className="overview">
                <h3>Overview</h3>
                {overview}
              </div>
            </div>

            {title}
          </div>
        );
      })}
    </section>
  );
}

export default NewMoviesList;
