// TMDB Autorization

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjJjYTgzYWFkZDExNDdkZjI2OGZjMjhkODQ2MDM4ZCIsInN1YiI6IjY1OTc2ZDEwNTkwN2RlMTRkYzYzYmYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9pgLlH8FQhJNvJZ4tqWPn0IB7TYI7gSgmAnDmb7gFUE'
  }
};


const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

// TMDB API Data 불러오기
fetch(url, options)
  .then(response => response.json())
  .then(data => {
    const movie_list = document.querySelector(".movie_collection");
    const movie_data = data["results"];

    const movie_result = movie_data.map(movie => {
      let name = movie.title;
      let poster_path = movie.poster_path;
      let imageURL = `https://image.tmdb.org/t/p/w200${poster_path}`;
      let overview = movie.overview;
      let rating = movie.vote_average;
      let id = movie.id;

      // Card List UI 
      // 수정 사항 1. API data를 받아와서 여러 개의 카드에 각각의 영화 정보를 넣는 것은 어떻게..?
      let movie_html = `
        <div class="movie-card" onclick="alert('${name}의 ID : ${id}')">
          <div class="movie-content">
            <h2>${name}</h2>
            <p>⭐${rating}</p>
            <p>${overview}</p>
          </div>
          <div class="movie-img">
            <img src='https://image.tmdb.org/t/p/w200${imageURL}' />
          </div>`;
      return movie_html;
    });

    movie_result.forEach(movie => {
      movie_list.innerHTML += movie;
    });
  })
  .catch((err) => console.error(err));

// 영화 검색 UI
// (1) Enter로 검색
const inputText = document.getElementById("search-input");
inputText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    showSearchResults();
  }
});

// (2) 버튼 클릭
const searchbtn = document.getElementById("search-btn");
searchbtn.addEventListener("click", showSearchResults());

// (3) 검색 결과 
function showSearchResults() {
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const movie_list = document.querySelector(".movie_collection");
      const movie_data = data["results"];
      const searched_list = movie_data.filter(movie => {
        return (movie["title"].includes(inputText.value));
      });

      const searched_result = searched_list.map(movie => {
        let name = movie.title;
        let poster_path = movie.poster_path;
        let imageURL = `https://image.tmdb.org/t/p/w200${poster_path}`;
        let overview = movie.overview;
        let rating = movie.vote_average;
        let id = movie.id;

        let movie_html = `
        <div class="movie-card" onclick="alert('${name}의 ID : ${sid}')">
          <div class="movie-content">
            <h2>${name}</h2>
            <p>⭐${rating}</p>
            <p>${overview}</p>
          </div>
          <div class="movie-img">
            <img src='https://image.tmdb.org/t/p/w200${imageURL}' />
          </div>
        `;
        return movie_html;
      })
      movie_list.innerHTML = "";

      searched_result.forEach(movie => {
        movie_list.innerHTML += movie;
      })
        .catch(err => console.error(err));
    });
};



// [4] 영화 검색 UI 구현
// (1) API로 받아온 전체 영화들 중 
// 영화 제목에 input 창에 입력한 문자값이 포함되는 영화들만 화면에 보이게 하기

// [6] 선택 요구사항 (optional) => 반드시 필수 요구사항을 모두 구현한 뒤 생각하기

// (2) 웹사이트 랜딩 or 새로고침 후 검색 입력란에 커서 자동 위치시키기
// (3) 대소문자 관계없이 검색 가능하게 하기
// (4) 키보드 enter키를 입력해도 검색버튼 클릭한 것과 동일하게 검색 실행
