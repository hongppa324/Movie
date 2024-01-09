export const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  // cardList => <ul>에 list 추가
  const cardList = document.querySelector("#card-list");
  cardList.innerHTML = movies
    .map(
      (movie) => `
  <li class="movie-card" id=${movie.id}>
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="...">
  <h1 class="movie-title">${movie.title}</h1>
  <p>⭐${movie.vote_average}</p>
  <p>${movie.overview}</p>
  </li>`
    )
    .join("");

  // 검색 UI
  cardList.addEventListenr("click", handleClickCard);

  function handleClickCard(event) {
    if (event.target === cardList) return;

    if (event.target.matches(".movie-card")) {
      alert(`${event.target.title}의 id: ${event.target.id}`);
    } else {
      alert(`${event.target.title}의 id: ${event.target.parentNode.id}`);
    }
  }
};

// getMovieData는 역할 끝
async function fetchMovieData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY5MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU"
    }
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&include_adult=false",
    options
  );
  const data = await response.json();
  return data.results;
}
