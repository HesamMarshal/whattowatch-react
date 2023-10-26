import React from "react";
import { imageURL } from "../../Utils/utils";
import peoplePlaceholder from "../../assets/images/peoplePlaceholder.svg";

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

export default Casts;
