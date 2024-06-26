import "./MoviesList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import MovieCard from "../../components/MovieCard/MovieCard";
import { movieURL } from "../../Utils/utils";

function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // On Load
  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(movieURL);
        // console.log(data.results);
        setMovies(data.results);
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

export default MoviesList;
