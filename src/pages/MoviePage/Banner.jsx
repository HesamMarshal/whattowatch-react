import React from "react";

import Loading from "../../components/Loading/Loading";
import imagePlaceholder from "../../assets/images/placeholder.jpg";
import { getColor, hourMinutes, imageURL, onlyYear } from "../../Utils/utils";

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

  const backdropFull = backdrop_path
    ? "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces" +
      backdrop_path
    : "";

  const backgroundStyle = {
    backgroundImage: `url(${backdropFull})`,
  };

  return (
    <div className="upper" style={backgroundStyle}>
      <div className="cover">
        <div className="banner container">
          <div className="bannerPoster">
            <img
              src={poster_path ? imageURL + poster_path : imagePlaceholder}
              alt={title}
            />
          </div>

          {/* TODO: Use suitable Icons for Adult */}
          <div className="bannerInfo">
            <h3 className="movieTitle">
              {title}&nbsp;({onlyYear(release_date)})
            </h3>
            <div className="details">
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
    </div>
  );
}

export default Banner;
