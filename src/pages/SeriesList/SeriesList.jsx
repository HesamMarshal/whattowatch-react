import "./SeriesList.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import imagePlaceholder from "../../assets/images/placeholder.jpg";
import { trakt_api_key } from "../../Utils/utils";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import SerieCard from "../../components/SerieCard/SerieCard";

// TMDB

// const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";

// const baseURL = "https://api.themoviedb.org/3";

// const API_URL = baseURL + "/discover/movie?sort_by=popularity.desc&language=fa&" + API_KEY;
// const seriesURL = baseURL + "/discover/tv?sort_by=popularity.desc&" + API_KEY;

const seriesURL = "https://api.trakt.tv/shows/trending";
// baseURL +
// "/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&" +
// API_KEY;

// const SEARCH_URL = baseURL + "/search/movie?" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function SeriesList() {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // On Load
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": 2,
        "trakt-api-key": [trakt_api_key],
      },
    };

    async function fetchSeries() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(seriesURL, config);
        setSeries(data);
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
        <Loading />
      </section>
    );
  return (
    <section id="new-series-list">
      {series.map((serie) => {
        return (
          <SerieCard tmdbId={serie.show.ids.tmdb} key={serie.show.ids.tmdb} />
        );
      })}
    </section>
  );
}

export default SeriesList;
