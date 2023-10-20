import axios from "axios";
import React, { useEffect, useState } from "react";
import imagePlaceholder from "../../assets/images/placeholder.jpg";
import { getColor } from "../../Utils/utils";

const baseURL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function SerieCard({ tmdbId }) {
  const [serieInfo, setSeriesInfo] = useState({});

  useEffect(() => {
    async function fetchSerie() {
      try {
        const seriesUrl = baseURL + `/tv/${tmdbId}?language=en-US&` + API_KEY;
        const { data } = await axios.get(seriesUrl);
        setSeriesInfo(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSerie();
  }, []);

  const {
    id: tmdb,
    original_name: title,
    poster_path,
    vote_average,
    overview,
  } = serieInfo;

  return (
    <div className="movie">
      <img
        src={poster_path ? IMG_URL + poster_path : imagePlaceholder}
        alt={title}
      />
      <div className="movieInfo">
        <h3 className="movieTitle">{title}</h3>
        <span className={`rating ${getColor(vote_average)}`}>
          {vote_average}
        </span>
        <div className="overview">
          <h3>Overview</h3>
          {overview}
        </div>
      </div>
    </div>
  );
}

export default SerieCard;
