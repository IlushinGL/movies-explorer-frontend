import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({mediaNum, movieCards}) {

  function handleSearchQuery() {
    console.log(`Запрос на поиск фильмов`);
  }

  return (
    <>
      <SearchForm mediaNum={mediaNum} onSubmit={handleSearchQuery} />
      <MoviesCardList mediaNum={mediaNum} movieCards={movieCards} />
      <Footer num={mediaNum} />
    </>
  );
}

export default Movies;
