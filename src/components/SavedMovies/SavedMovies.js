import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function SavedMovies({mediaNum, movieCards, onDelete, onSubmit, movieQuery}) {

  return (
    <>
      <SearchForm
        mediaNum={mediaNum}
        onSubmit={onSubmit}
        movieQuery={movieQuery} />
      <MoviesCardList
        mediaNum={mediaNum}
        movieCards={movieCards}
        onDelete={onDelete}/>
      <Footer num={mediaNum} />
    </>
  );
}

export default SavedMovies;
