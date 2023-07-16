let moviesWrapper = document.querySelector(".movies__wrapper");
let searchInput = document.querySelector(".search__input");
let api = "https://omdbapi.com/?apikey=c746e04e&";

async function searchButtonClicked(event) {
  const res = await fetch(api + `s=${searchInput.value}`);
  const data = await res.json();

  if (data.Search) {
    renderMovies(data.Search);
  }
}

function renderMovies(movies) {
  newMoviesHtml = movies
    .map(
      (movie) => `
    <div class="flex flex-col mx-1 justify-center items-center">
    <p class="text-sm">${movie.Title}</p>
    <img class="max-h-40 object-contain" src=${movie.Poster} alt="" />
    </div>
  `
    )
    .slice(0, 10)
    .join("");
  moviesWrapper.innerHTML = newMoviesHtml;
}
