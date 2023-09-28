import "./NewMoviesList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import imagePlaceholder from "../assets/images/placeholder.jpg";
import { Link } from "react-router-dom";

// TMDB

const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";
const baseURL = "https://api.themoviedb.org/3";
// const API_URL = baseURL + "/discover/movie?sort_by=popularity.desc&language=fa&" + API_KEY;
const movieURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const searchURL = baseURL + "/search/movie?" + API_KEY;
const imageURL = "https://image.tmdb.org/t/p/w500/";

function NewMoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // On Load
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(movieURL);
        // console.log(data.results);
        setMovies(data.results.slice(0, 4));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <section id="new-movie-list">
      {movies.map((movie) => {
        return <Movie key={movie.id} movie={movie} />;
      })}
    </section>
  );
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

export default NewMoviesList;
function Movie({ movie }) {
  const { id: tmdb, title, poster_path, vote_average, overview } = movie;
  return (
    <Link to={`/movie/${tmdb}`}>
      <div className="movie">
        <img
          src={poster_path ? imageURL + poster_path : imagePlaceholder}
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
      </div>
    </Link>
  );
}
