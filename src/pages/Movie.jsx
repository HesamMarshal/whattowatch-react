import "./Movie.css";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getColor, onlyYear, hourMinutes } from "../Utils/utils";

import imagePlaceholder from "../assets/images/placeholder.jpg";
import peoplePlaceholder from "../assets/images/peoplePlaceholder.svg";
import justWatch from "../assets/images/justwatch-logo.svg";

// TMDB
const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_BASE_URL;

// const searchURL = baseURL + "/search/movie?" + API_KEY;
const imageURL = "https://image.tmdb.org/t/p/w500/";

function Movie() {
  const [movie, setMovie] = useState({});
  const [casts, setCasts] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [watchProvider, setWatchProvider] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // onMount
  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieURL = baseURL + `/movie/${id}?language=en-US;&` + API_KEY;
        const movieCreditsURL =
          baseURL + `/movie/${id}/credits??language=en-US&` + API_KEY;

        // https://api.themoviedb.org/3/movie/603/watch/providers
        const watchProviderURL =
          baseURL + `/movie/${id}/watch/providers?language=en-US;&` + API_KEY;

        setIsLoading(true);

        const { data } = await axios.get(movieURL);
        // console.log(data);

        setMovie(data);

        const { data: movieCredits } = await axios.get(movieCreditsURL);
        setCasts(movieCredits.cast);
        setDirectors(
          movieCredits.crew.filter((item) => item.job === "Director")
        );
        setWriters(movieCredits.crew.filter((item) => item.job === "Writer"));

        const { data: watchProviderList } = await axios.get(watchProviderURL);
        // console.log(watchProviderList.results);
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
      <Banner
        movie={movie}
        isLoading={isLoading}
        directors={directors}
        writers={writers}
      />
      <div className="extraDetails">
        <div className="movieSidebar">
          <WatchProvider providerList={watchProvider} />
        </div>
        <div className="moviePannel">
          <Casts casts={casts} />
        </div>
      </div>
    </div>
  );
}

export default Movie;

function Banner({ movie, isLoading, directors, writers }) {
  if (isLoading) <Loading />;

  const {
    id: tmdb,
    title,
    poster_path,
    vote_average,
    vote_count,
    tagline,
    overview,
    backdrop_path,
    release_date,
    status,
    adult,
    genres,
    imdb_id,
    original_language,
    production_companies,
    production_countries,
    runtime,
  } = movie;

  const hourMin = hourMinutes(runtime);

  return (
    <div className="upper">
      <div className="banner container">
        {/* <img
      src={backdrop_path ? imageURL + backdrop_path : imagePlaceholder}
      alt={title}
    /> */}
        <div className="bannerPoster">
          <img
            src={poster_path ? imageURL + poster_path : imagePlaceholder}
            alt={title}
          />
        </div>

        <div className="bannerInfo">
          <h3 className="movieTitle">
            {title}&nbsp;({onlyYear(release_date)})
          </h3>
          <div className="details">
            {/* TODO: Use suitable Icons for Adult */}
            <span className="adult">{!adult ? "R" : "X"}</span>&nbsp;&bull;
            <span className="releaseDate">&nbsp;{release_date}</span>
            <span className="country">
              &nbsp; (
              {production_countries && production_countries[0].iso_3166_1}
              )&nbsp;&bull;
            </span>
            <span className="genere">
              {genres &&
                genres.map((item) => (
                  <span key={item.id}>&nbsp;{item.name}&nbsp;</span>
                ))}
            </span>
            <span className="duration">
              &nbsp;&bull; {hourMin && hourMin.hour}:{hourMin && hourMin.mins}
            </span>
          </div>
          <div className="rating">
            Score:{" "}
            <span className={getColor(vote_average)}>
              {vote_average && vote_average.toFixed(2)}
            </span>
            {/* TODO: add IMDB rating */}
          </div>

          <div className="tagline">{tagline}</div>
          <div className="overview">
            <h3>Overview</h3>
            {overview}
          </div>

          <div className="producers">
            <div className="directors">
              <h3>Directors:</h3>
              <div>
                {directors.map((director) => (
                  <span key={director.id}>{director.name} &nbsp;</span>
                ))}
              </div>
            </div>
            <div className="writers">
              <h3>Writers:</h3>
              <div>
                {writers.map((writer) => (
                  <span key={writer.id}>{writer.name} &nbsp;</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Casts({ casts }) {
  return (
    <div className="cast">
      <h3>Cast:</h3>
      <ol className="people scroller">
        {casts.map((c) => {
          const {
            adult,
            cast_id,
            character,
            gender,
            id,
            known_for_department,
            name,
            original_name,
            profile_path,
          } = c;
          return (
            <li key={cast_id} className="card">
              <a>
                <img
                  className="peopleImg"
                  loading="lazy"
                  src={
                    profile_path ? imageURL + profile_path : peoplePlaceholder
                  }
                  alt={name}
                />
              </a>
              <p className="actorName">
                <a href="">{name}</a>
              </p>
              <p className="character">{character}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function WatchProvider({ providerList }) {
  return (
    <div className="watchProvider">
      {/* <h3>Watch provider</h3> */}
      <img src={justWatch} alt="justWatch" className="justWatch" />
      <div className="providersList">
        {Object.entries(providerList).map((provider) => {
          const rentProvider = provider[1].rent;

          return (
            <div key={provider[0]} className="providerCountry">
              <div className="providerCountryName">
                Country:{" "}
                <ReactCountryFlag
                  svg
                  countryCode={provider[0]}
                  alt={provider[0]}
                />
              </div>
              <div className="rentProvider">
                {rentProvider?.map((rent) => (
                  <img
                    className="providerLogo"
                    src={imageURL + rent.logo_path}
                    alt={rent.provider_name}
                    key={rent.provider_name}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
