import React from "react";

import Loading from "../../components/Loading";

import { getColor, imageURL, onlyYear } from "../../Utils/utils";

import imagePlaceholder from "../../assets/images/placeholder.jpg";

function SeriesBanner({ serie, isLoading, creator }) {
  if (isLoading) <Loading />;

  const {
    id: tmdb,
    name: title,
    poster_path,
    vote_average,
    vote_count,
    tagline,
    overview,
    backdrop_path,
    first_air_date,
    status,
    adult,
    genres,
    imdb_id,
    original_language,
    production_companies,
    production_countries,
  } = serie;

  // const hourMin = hourMinutes(runtime);

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
            {title}&nbsp;({onlyYear(first_air_date)})
          </h3>
          <div className="details">
            {/* TODO: Use suitable Icons for Adult */}
            <span className="adult">{!adult ? "R" : "X"}</span>&nbsp;&bull;
            <span className="releaseDate">&nbsp;{first_air_date}</span>
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
            {/* TODO: Change classname */}
            <span className="duration">&nbsp;&bull; {status}</span>
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
            <div className="creator directors">
              <h3>Creators:</h3>
              <div>
                {creator.map((director) => (
                  <span key={director.id}>{director.name} &nbsp;</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesBanner;
