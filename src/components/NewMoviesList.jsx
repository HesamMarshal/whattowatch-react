import "./NewMoviesList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";

import MovieCard from "./MovieCard/MovieCard";

// TMDB

const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";
const baseURL = "https://api.themoviedb.org/3";
// const API_URL = baseURL + "/discover/movie?sort_by=popularity.desc&language=fa&" + API_KEY;
const movieURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const searchURL = baseURL + "/search/movie?" + API_KEY;

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
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </section>
  );
}

export default NewMoviesList;
