const bearerToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTQ0MTQ4ZWIzOTExZjlkNGY2MzAxZGY5YjBjOTZlMiIsInN1YiI6IjY2MjViMGM4NjJmMzM1MDE3ZGRhMDFhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.my0shwxxFlTtv5hBOjqmYeciNLHwcg3xR8WykTmWv5M";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
};

async function getMovies() {
  try {
    const endpoint = "movie/popular";
    const url = `https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

let allMovies = [];

async function displayMovies(inputValue = "") {
  try {
    const movieContainer = document.querySelector(".movie__container");
    movieContainer.innerHTML = "";
    const filteredMovies = inputValue
      ? allMovies.filter((movie) =>
          movie.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      : allMovies;
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
      //   img , title , overview, raiting
      movieContainer.appendChild(movieCard);
      movieCard.addEventListener("click", () => {
        const movieId = movieCard.dataset.key;
        alert(`id: ${movieId}`);
      });
    }
  } catch (e) {
    console.error(e);
    document.querySelector(".error__message").classList.remove("hidden");
  }
}

async function initMovies() {
  try {
    allMovies = await getMovies();
    displayMovies();
  } catch (e) {
    console.error(e);
  }
}

let inputValue = "";

const headerForm = document.querySelector(".header__form");
const searchInput = document.querySelector(".header__form--input");
headerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  inputValue = searchInput.value;
  displayMovies(inputValue);
});

initMovies();
