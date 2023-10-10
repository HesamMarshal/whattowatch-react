import React from "react";

function ReleaseNotes() {
  return (
    <section id="release">
      <div className="release">
        <h3>Version 0.1.0</h3>
        <ul>
          <li>improve styles and appearance </li>
          <li>Add Directors and Writers</li>
          <li>Add cast of a movie</li>
          <li>Add Logo and Favicon</li>
        </ul>
      </div>
      <div className="release">
        <h3>Version 0.01</h3>
        <p>First Release</p>
      </div>
    </section>
  );
}

export default ReleaseNotes;
