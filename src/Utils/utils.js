// TMDB
const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";
const BASE_URL = "https://api.themoviedb.org/3";

export const imageURL = "https://image.tmdb.org/t/p/w500/";

// movie URLS
export const movieURL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

// Series URLS

// Search URLS
export const searchURL = BASE_URL + "/search/movie?" + API_KEY;
export const multiSearchURL = BASE_URL + "/search/multi?" + API_KEY;

// export const movieCredits =
//   BASE_URL + "/movie/movie_id/credits?language=en-US';";

// TODO: Change to goodMovie, badMovie, fairMovie
export function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

export function onlyYear(dateString) {
  if (!dateString) return;
  const splited = dateString.split("-");
  return splited[0];
}
export function hourMinutes(minutes) {
  if (!minutes) return;
  const hour = Math.floor(minutes / 60);
  // console.log(hour);
  const mins = minutes % 60;
  return { hour, mins };
}
