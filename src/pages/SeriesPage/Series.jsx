import "./Series.css";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SeriesBanner from "./SeriesBanner";
import { BASE_URL } from "../../Utils/utils";
import SeriesCasts from "./SeriesCasts";

// import Casts from "./Casts";
// import WatchProvider from "./WatchProvider";

// TMDB
const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = BASE_URL;
// /series_id?language=en-US'

function Series() {
  const [serie, setSerie] = useState({});
  const [casts, setCasts] = useState([]);
  const [creator, setCreator] = useState([]);
  const [watchProvider, setWatchProvider] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // onMount
  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieURL = baseURL + `/tv/${id}?language=en-US;&` + API_KEY;
        const movieCreditsURL =
          baseURL + `/tv/${id}/credits??language=en-US&` + API_KEY;

        const watchProviderURL =
          baseURL + `/tv/${id}/watch/providers?language=en-US;&` + API_KEY;

        setIsLoading(true);

        const { data } = await axios.get(movieURL);
        setSerie(data);
        setCreator(data.created_by.splice(0, 3));

        const { data: movieCredits } = await axios.get(movieCreditsURL);
        setCasts(movieCredits.cast);
        // console.log(movieCredits.cast);

        const { data: watchProviderList } = await axios.get(watchProviderURL);
        setWatchProvider(watchProviderList.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, []);

  return (
    <div className="singleMovie">
      <SeriesBanner serie={serie} isLoading={isLoading} creator={creator} />
      <div className="extraDetails">
        <div className="movieSidebar">
          Watch Provider
          {/* <WatchProvider providerList={watchProvider} /> */}
        </div>
        <div className="moviePannel">
          <SeriesCasts casts={casts} />
        </div>
      </div>
    </div>
  );
}

export default Series;
