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

const handleCardClick = (e) => {
  const movieId = e.currentTarget.dataset.key;
  alert(`id: ${movieId}`);
};

function renderMovieCards(filteredMovies) {
  const movieContainer = document.querySelector(".movie__container");
  movieContainer.innerHTML = "";
  const fragment = new DocumentFragment();
  for (const movie of filteredMovies) {
    const { title, poster_path, overview, vote_average } = movie;
    const movieCard = document.createElement("li");
    movieCard.className = "movie__card";
    movieCard.setAttribute("data-key", movie.id);
    movieCard.innerHTML = `
              <div class="movie__img__container">
              <img src="https://image.tmdb.org/t/p/w200/${poster_path}" alt="${title}" />
              </div>
              <div class="movie__detail">
              <h2 class="movie__title">${title}</h2>
              <p class="movie__overview"">${overview}</p>
              <p class="movie__rating">Rating: ${vote_average}</p>
              </div>
                  `;
    fragment.appendChild(movieCard);
    movieCard.addEventListener("click", handleCardClick);
  }
  movieContainer.appendChild(fragment);
}
