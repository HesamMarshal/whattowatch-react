// TMDB
const API_KEY = "api_key=8bde9f388c6e89b90a68fdc2eaddcbf8";
const BASE_URL = "https://api.themoviedb.org/3";

export const imageURL = "https://image.tmdb.org/t/p/w500/";

// const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&language=fa&" + API_KEY;
export const movieURL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

export const searchURL = BASE_URL + "/search/movie?" + API_KEY;

export function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
