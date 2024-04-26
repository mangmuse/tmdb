import { displayMovies } from "./displayMovies.js";
import { getMovies } from "./getMovies.js";
import { sortMovies } from "./sortMovies.js";

let allMovies = [];

async function initMovies() {
  try {
    allMovies = await getMovies();
    allMovies.sort((a, b) => b.vote_average - a.vote_average);
    displayMovies(allMovies);
  } catch (e) {
    console.error(e);
  }
}

let inputValue = "";

const handleFormSubmit = (e) => {
  const searchInput = document.querySelector(".header__form--input");
  e.preventDefault();
  inputValue = searchInput.value;
  displayMovies(allMovies, inputValue);
  window.scrollTo(0, 0);
};
const handleSortChange = (e) => {
  const selectedOption = e.target.value;
  const sortedMovies = sortMovies(allMovies, selectedOption);
  displayMovies(sortedMovies, inputValue);
  window.scrollTo(0, 0);
};

const headerForm = document.querySelector(".header__form");
const sortOption = document.querySelector("#sort__option");

headerForm.addEventListener("submit", handleFormSubmit);
sortOption.addEventListener("change", handleSortChange);

initMovies();
