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

async function displayMovies(movies = allMovies, inputValue = "") {
  try {
    const movieContainer = document.querySelector(".movie__container");
    movieContainer.innerHTML = "";
    const filteredMovies = inputValue
      ? movies.filter((movie) =>
          movie.title.toLowerCase().includes(inputValue.toLowerCase())
        )
      : movies;
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
    allMovies.sort((a, b) => b.vote_average - a.vote_average);
    displayMovies(allMovies);
  } catch (e) {
    console.error(e);
  }
}

function sortMovies(movies, option) {
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

let inputValue = "";

const headerForm = document.querySelector(".header__form");

headerForm.addEventListener("submit", (e) => {
  const searchInput = document.querySelector(".header__form--input");
  e.preventDefault();
  inputValue = searchInput.value;
  displayMovies(allMovies, inputValue);
});

const sortOption = document.querySelector("#sort__option");

sortOption.addEventListener("change", (e) => {
  const selectedOption = e.target.value;
  const sortedMovies = sortMovies(allMovies, selectedOption);
  displayMovies(sortedMovies, inputValue);
});

initMovies();
