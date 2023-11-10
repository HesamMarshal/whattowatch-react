import "./release.css";
import React from "react";

function ReleaseNotes() {
  return (
    <section id="releases">
      <div className="container">
        <div className="release">
          <h3>Version 0.6.0:</h3>
          <ol>
            <li>Search between series and movies</li>
            <li>Mobile View for movies and series</li>
            <li>Change link color</li>
            <li>Change /NewMovieList address to /moviesList</li>
            <li>Performance improvement</li>
          </ol>
        </div>
        <div className="release">
          <h3>Version 0.5.0:</h3>
          <ol>
            <li>add backdrop to banner</li>
            <li>Link to each series</li>
            <li>Performance improvement</li>
            <li>Visual improvement</li>
          </ol>
        </div>

        <div className="release">
          <h3>Version 0.4.0:</h3>
          <ol>
            <li>Add mobile view for Home Page</li>
            <li>Add provider from just watch</li>
          </ol>
        </div>
        <div className="release">
          <h3>Version 0.3.0:</h3>
          <ol>
            <li>Tv Show Banner</li>
          </ol>
        </div>

        <div className="release">
          <h3>Version 0.2.0:</h3>
          <ol>
            <li>Show the score only with two decimal points</li>
            <li>Show movie duration by Hour:Minutes</li>
            <li>Show only the year in title of movie</li>
            <li>Change color theme to</li>
          </ol>
        </div>
        <div className="release ">
          <h3>Version 0.1.0:</h3>
          <ol>
            <li>improve styles and appearance </li>
            <li>Add Directors and Writers</li>
            <li>Add cast of a movie</li>
            <li>Add Logo and Favicon</li>
          </ol>
        </div>
        <div className="release">
          <h3>Version 0.01:</h3>
          <p>First Release</p>
        </div>
      </div>
    </section>
  );
}

export default ReleaseNotes;
