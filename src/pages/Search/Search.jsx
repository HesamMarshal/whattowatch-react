import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { multiSearchURL, searchURL } from "../../Utils/utils";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import ItemCard from "./ItemCard";

function Search() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchItem = searchParams.get("search");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${multiSearchURL}&query=${searchItem}`
        );
        // console.log(data.results);
        setMovies(data.results);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
  }, [searchItem]);

  if (isLoading) return <Loading />;
  return (
    <section id="new-movie-list">
      {movies.map((movie) => {
        return <ItemCard key={movie.id} movie={movie} />;
      })}
    </section>
  );
}

export default Search;
