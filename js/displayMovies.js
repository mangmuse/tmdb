export function displayMovies(movies, inputValue = "") {
  try {
    const filteredMovies = inputValue
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      : movies;
    renderMovieCards(filteredMovies);
  } catch (e) {
    console.error(e);
    document.querySelector(".error__message").classList.remove("hidden");
  }
}
function renderMovieCards(filteredMovies) {
  const movieContainer = document.querySelector(".movie__container");
  movieContainer.innerHTML = "";
  for (const movie of filteredMovies) {
    const movieCard = document.createElement("li");
    movieCard.className = "movie__card";
    movieCard.setAttribute("data-key", movie.id);
    movieCard.innerHTML = `
              <div class="movie__img__container">
              <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="${movie.title}" />
              </div>
              <div class="movie__detail">
              <h2 class="movie__title">${movie.title}</h2>
              <p class="movie__overview"">${movie.overview}</p>
              <p class="movie__rating">Rating: ${movie.vote_average}</p>
              </div>
                  `;
    movieContainer.appendChild(movieCard);
    movieCard.addEventListener("click", () => {
      const movieId = movieCard.dataset.key;
      alert(`id: ${movieId}`);
    });
  }
}
