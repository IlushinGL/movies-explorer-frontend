import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({mediaNum, movieCards, onSelect, onSubmit, isWait, message, selectionSet}) {

  return (
    <>
      <SearchForm mediaNum={mediaNum} name='movies' onSubmit={onSubmit} />
      <MoviesCardList
        mediaNum={mediaNum}
        movieCards={movieCards}
        onSelect={onSelect}
        isWait={isWait}
        message={message}
        selectionSet={selectionSet}/>
      <Footer num={mediaNum} />
    </>
  );
}

export default Movies;
