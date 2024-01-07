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
const inputText = documetn.getElementById("search-input");
inputText.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchResults();
  }
});
// (2) 버튼 클릭
const searchbtn = document.getElementById("search-btn");
searchbtn.addEventListener("click", searchResults());

// (3) 검색 결과 
function searchResults() {
  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const movie_list = document.querySelector(".movie_collection");
      const movie_data = data["results"];
      const searchResult = movie_data.filter(movie => {
        return (movie["title"].includes(inputText.value));
      });

      const showResults = searchResult.map(movie => {
        let name = movie.title;
        let poster_path = movie.poster_path;
        let imageURL = `https://image.tmdb.org/t/p/w200${poster_path}`;
        let overview = movie.overview;
        let rating = movie.vote_average;
        let id = movie.id;

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

      movie_list.innerHTML = "";

      showResults.forEach(movie => {
        movie_list.innerHTML += movie;
      });
    });
};



// [4] 영화 검색 UI 구현
// (1) API로 받아온 전체 영화들 중 
// 영화 제목에 input 창에 입력한 문자값이 포함되는 영화들만 화면에 보이게 하기


// [5] JavaScript 문법 요소 구현하기
// (1) const와 let 만을 이용한 변수 선언 필수 (var X)

// (2) 화살표 함수 중 1개 이상 필수

// (2-1) 일반 화살표 함수
// let add = (x, y) => {
//     return x + y;
//   }
//   console.log(add(2, 3));

// (2-2) 한 줄로 된 화살표 함수
// let add = (x, y) => x + y;
// console.log(add(2, 3));   // 5

// (2-3) 매개변수가 하나인 화살표 함수
// let square = x => x * x;
// console.log(square(3));   // 9

// (3) 배열 메소드 중 2개 이상 필수 : "map"
// forEach, map, filter, reduce, find

// (4) DOM 제어하기 API 중 2개 이상 필수
// (4-1) 문서 객체 생성과 선택
// document.createElement(tagName); // -> 새로운 html 요소 생성
// document.getElementById(id); // -> id 속성을 기준으로 요소 선택
// document.getElementsByTagName(name); // -> 태그 이름을 기준으로 요소 선택
// document.getElementsByClassName(name); // -> 클래스 이름을 기준으로 요소 선택
// document.querySelector(selector); // -> CSS 선택자를 이용하여 요소를 선택 
// document.querySelectorAll(selector); // -> CSS 선택자를 이용하여 모든 요소를 선택
// (4-2) 문서 객체 조작


// element.innerHTML; // -> 해당 요소 내부의 html 코드를 변경
// element.textContent; // -> 해당 요소 내부의 텍스트를 변경
// element.setAttribute(attr, value); // -> 해당 요소의 속성 값을 변경
// element.getAttribute(attr); // -> 해당 요소의 속성 값을 가져옴
// element.style.property; // -> 해당 요소의 스타일 값을 변경
// element.appendChild(child); // -> 해당 요소의 하위 요소로 child를 추가
// element.removeChild(child); // -> 해당 요소의 하위 요소로 child를 삭제
// element.classList.add(); // -> 해당 요소의 클래스에 새로운 클래스 추가
// element.classList.remove(); // -> 해당 요소의 클래스 중에 특정 클래스 제거
// element.classList.toggle(); // -> 해당 요소의 클래스 중에 특정 클래스를 추가 또는 제거
// (4-3) 이벤트 처리
// element.addEventListner(type, listener); // -> 해당 요소에서 이벤트가 발생했을 때 호출할 함수 등록
// element.removeEventListner(type, listener); // -> 해당 요소에서 등록된 함수 제거
// element.preventDefault( ); // -> 이벤트가 발생했을 때 기본동작을 취소
// element.stopPropagation( ); // -> 이벤트의 버블링을 방지하기 위해 이벤트 전파를 중지
// (4-4) 기타
// window.location.href; // -> 현재 페이지의 URL을 가져옴
// window.alert(message); // -> 경고 메시지 출력
// window.confirm(message); // -> 확인 메시지를 출력하고 사용자의 답변에 따라 boolean 값 반환



// [6] 선택 요구사항 (optional) => 반드시 필수 요구사항을 모두 구현한 뒤 생각하기
// (1) CSS : flex, grid 사용하기
// (2) 웹사이트 랜딩 or 새로고침 후 검색 입력란에 커서 자동 위치시키기
// (3) 대소문자 관계없이 검색 가능하게 하기
// (4) 키보드 enter키를 입력해도 검색버튼 클릭한 것과 동일하게 검색 실행