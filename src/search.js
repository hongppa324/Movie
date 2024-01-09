export const handleSearch = (searchKeyword) => {
  const movieCards = document.querySelectorAll(".movie-card");

  // list 내 모든 card에 대한 검색
  movieCards.forEach((card) => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase;
    const searchedValue = searchKeyword.toLowerCase();

    // 검색값을 소문자로 변환 -> title이 포함된 card만 display
    if (title.includes(searchedValue)) {
      card.style.display = "block"; // block box generation
    } else {
      card.style.display = "none";
    }
  });
};
