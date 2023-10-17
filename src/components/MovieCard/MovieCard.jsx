import "./MovieCard.css";
import React from "react";
import { Link } from "react-router-dom";

import imagePlaceholder from "../../assets/images/placeholder.jpg";
import { getColor, imageURL } from "../../Utils/utils";

function MovieCard({ movie }) {
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

export default MovieCard;
