let moviesWrapper = document.querySelector(".movies__wrapper");
let searchInput = document.querySelector(".search__input");
let api = "https://omdbapi.com/?apikey=c746e04e&";
let loadingImg = document.querySelector(".loading__img");
let inputFeedback = document.querySelector(".input__feedback");

async function searchButtonClicked() {
  const res = await fetch(api + `s=${searchInput.value}`);
  const data = await res.json();

  inputFeedback.innerHTML = `Search Results for: <span class="text-purple-900">${searchInput.value}</span>`;

  renderMovies(data.Search);
}

async function enterKeyPressed(event) {
  if (event.key === "Enter") searchButtonClicked();
}

function renderMovies(movies) {
  let newMoviesHtml = "";

  loadingImg.classList.remove("hidden");
  loadingImg.classList.add("block");
  moviesWrapper.innerHTML = newMoviesHtml;

  if (movies) {
    newMoviesHtml = movies
      .map(
        (movie) => `
    <div class="flex flex-col mx-1 justify-center items-center">
    <p class="text-sm">${movie.Title}</p>
    <img class="max-h-40 object-contain" src=${movie.Poster} alt="" />
    </div>
  `
      )
      .slice(0, 5)
      .join("");
  }

  if (newMoviesHtml === "") {
    newMoviesHtml = `<div class="flex text-center"><p class="font-semibold">Couldn't find any matches for your related search.</p></div>`;
  }

  setTimeout(() => {
    loadingImg.classList.remove("block");
    loadingImg.classList.add("hidden");
    moviesWrapper.innerHTML = newMoviesHtml;
  }, 1000);
}
