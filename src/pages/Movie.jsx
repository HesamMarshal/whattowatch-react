import "./Movie.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import imagePlaceholder from "../assets/images/placeholder.jpg";

// TMDB
const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";
const baseURL = "https://api.themoviedb.org/3";

// const searchURL = baseURL + "/search/movie?" + API_KEY;
const imageURL = "https://image.tmdb.org/t/p/w500/";

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function Movie() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  //   console.log(id);
  // onMount
  useEffect(() => {
    async function fetchMovie() {
      try {
        const movieURL = baseURL + `/movie/${id}?language=en-US;&` + API_KEY;
        setIsLoading(true);
        const { data } = await axios.get(movieURL);
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, []);

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
  return (
    <div className="singleMovie">
      <div className="banner">
        {/* <img
          src={backdrop_path ? imageURL + backdrop_path : imagePlaceholder}
          alt={title}
        /> */}
        <div className="poster">
          <img
            src={poster_path ? imageURL + poster_path : imagePlaceholder}
            alt={title}
          />
        </div>

        <div className="bannerInfo">
          <h3>
            {/* TODO: split date to only year */}
            {title}&nbsp;({release_date})
          </h3>
          <div className="details">
            {/* TODO: Use suitable Icons for Adult */}
            <div className="adult">{!adult ? "R" : "X"}&nbsp;&bull;</div>
            <div className="releaseDate">{release_date}</div>
            <div className="country">
              &nbsp; (
              {production_countries && production_countries[0].iso_3166_1}
              )&nbsp;&bull;
            </div>
            <div className="genere">
              {genres &&
                genres.map((item) => (
                  <span key={item.id}>&nbsp;{item.name}&nbsp;-</span>
                ))}
            </div>
            {/* Todo: Change runtime to Hour and minutes */}
            <div className="duration">&nbsp;&bull;{runtime}m</div>
          </div>
          <div className="rating">
            TMDB: <span className={getColor(vote_average)}>{vote_average}</span>
            {/* TODO: add IMDB rating */}
          </div>

          <div className="tagline">{tagline}</div>
          <div className="overview">
            <h3>Overview</h3>
            {overview}
          </div>
          {/* TODO: implemet it */}
          <div className="producers">
            <div className="directors">
              <h3>Directors:</h3>
              <div>writer name ...</div>
            </div>
            <div className="writers">
              <h3>Writers:</h3>
              <div>writer name ...</div>
            </div>
          </div>
          <div className="movieInfo"></div>
        </div>
      </div>

      <div className="body">
        <div className="movieSidebar">SideBar</div>
        <div className="moviePannel"></div>
      </div>
    </div>
  );
}

export default Movie;
