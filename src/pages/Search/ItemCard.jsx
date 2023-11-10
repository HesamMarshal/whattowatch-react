import "./ItemCard.css";
import React from "react";
import { Link } from "react-router-dom";

import imagePlaceholder from "../../assets/images/placeholder.jpg";
import { getColor, imageURL } from "../../Utils/utils";

function ItemCard({ movie }) {
  const {
    id: tmdb,
    title,
    poster_path,
    vote_average,
    overview,
    media_type,
  } = movie;

  const itemLink =
    media_type === "movie" ? `/movie/${tmdb}` : `/series/${tmdb}`;
  return (
    <Link to={itemLink}>
      <div className="movie">
        <img
          src={poster_path ? imageURL + poster_path : imagePlaceholder}
          alt={title}
        />
        <div className="movieInfo">
          <h3 className="movieTitle">{title}</h3>
          <span className={`rating ${getColor(vote_average)}`}>
            {vote_average.toFixed(2)}
          </span>
          <div className="overview">
            <h3>Overview</h3>
            {overview}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
