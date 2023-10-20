import "./SeriesBanner.css";
import "../../../components/MovieCard/MovieCard.css";

import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import Loading from "../../../components/Loading";
import SerieCard from "../../../components/SerieCard/SerieCard";

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

function SeriesBanner() {
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

        setSeries(data.splice(0, 4));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }

    fetchSeries();
  }, []);

  if (isLoading)
    return (
      <section id="new-series-list">
        <div className="newSeriesBox">
          <h3>Trending Series:</h3>
          <Loading />
        </div>
      </section>
    );
  return (
    <section id="new-series-list">
      <div className="newSeriesBox">
        <h3>Trending Series:</h3>
        <div className="seriesAlbum">
          {series.map((serie) => {
            return (
              <SerieCard
                tmdbId={serie.show.ids.tmdb}
                key={serie.show.ids.tmdb}
              />
            );
          })}
        </div>
        <div className="showMore">
          <Link to="">Show More ...</Link>
        </div>
      </div>
    </section>
  );
}

export default SeriesBanner;
