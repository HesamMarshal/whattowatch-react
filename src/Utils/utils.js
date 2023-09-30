export const imageURL = "https://image.tmdb.org/t/p/w500/";

export function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
