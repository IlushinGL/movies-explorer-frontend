import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function SavedMovies({mediaNum, movieCards}) {

  function handleSearchQuery() {
    console.log(`Запрос на поиск схранённых фильмов`);
  }

  return (
    <>
      <SearchForm mediaNum={mediaNum} onSubmit={handleSearchQuery} />
      <MoviesCardList mediaNum={mediaNum} movieCards={movieCards} />
      <Footer num={mediaNum} />
    </>
  );
}

export default SavedMovies;
