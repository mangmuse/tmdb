export function sortMovies(movies, option) {
  switch (option) {
    case "rating__desc":
      return movies.sort((a, b) => b.vote_average - a.vote_average);
    case "rating__asc":
      return movies.sort((a, b) => a.vote_average - b.vote_average);
    case "title__asc":
      return movies.sort((a, b) => a.title.localeCompare(b.title));
    case "title__desc":
      return movies.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return movies;
  }
}
