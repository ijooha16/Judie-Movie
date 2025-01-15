import datas from './data.js';
import getData from "./-getData.js";
import heroMovie from "./heroMovie.js";
import renderData from "./-renderData.js";
import searchFunct from "./searchFunct.js";
import { openModalFunct, closeModal } from "./modalOpenClose.js";







//call
const movieListContent = document.querySelector("#movie_list_content");
const input = document.querySelector("#search_input");
const logo = document.querySelector('.logo')



//재시작 스크롤 리셋
window.onload = function() {
  setTimeout(() => {
      window.scrollTo(0,0);
  }, 10)
};



//로고 클릭 이벤트
logo.addEventListener('click', () => {
  window.onload();
})





//execution
async function loadMovies() {
  const data = datas.trend;
  
  
  heroMovie(data);
  // openModal(datas.trend, movieListContent);
  closeModal();
  renderData(data, movieListContent)

  movieListContent.addEventListener("click", (card) => {
    const clickedCard = card.target.closest(".card");
    const movie = data.filter((movie) => Number(movie.id) === Number(clickedCard.id))[0];
    
    openModalFunct(movie);
  });
}

window.onload();
loadMovies();



//search execute
input.addEventListener('input', async() => {
  const value = input.value.trim();
  const search = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-EN&page=1`;
  const searchData = await getData(search);
  //error01 함수 안에 있어야만 적용 됨. 왜?

  let filtered = await searchData.filter((movie) =>
    movie.title.toLowerCase().includes(value.toLowerCase())
  );

  console.log(`!!!!!!!!!!!!!!!!!${await searchData}`)
  searchFunct(input, value, filtered, movieListContent);





  /////////////////////////////test
  movieListContent.addEventListener("click", (card) => {
    const clickedCard = card.target.closest(".card");
    const movie = filtered.filter((movie) => Number(movie.id) === Number(clickedCard.id))[0];
    
    openModalFunct(movie);
  });
})