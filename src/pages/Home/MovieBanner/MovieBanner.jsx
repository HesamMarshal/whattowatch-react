import "./MovieBanner.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

import Loading from "../../../components/Loading";
import MovieCard from "../../../components/MovieCard/MovieCard";
import { movieURL } from "../../../Utils/utils";
import { Link } from "react-router-dom";

function MovieBanner() {
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

  if (isLoading)
    return (
      <section id="new-movie-list">
        <div className="newMovieBox">
          <h3>Trending Movies: </h3>
          <Loading />
        </div>
      </section>
    );
  return (
    <section id="new-movie-list">
      <div className="newMovieBox">
        <h3>Trending Movies: </h3>
        <div className="movieAlbum">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
        <div className="showMore">
          <Link to="/newMovieList">
            <span>Show More </span>
            <AiOutlineArrowRight className="icon" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default MovieBanner;
