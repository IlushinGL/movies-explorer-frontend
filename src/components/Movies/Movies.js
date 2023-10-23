import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({mediaNum, movieCards, onSelect, onSubmit}) {

  return (
    <>
      <SearchForm mediaNum={mediaNum} name='movies' onSubmit={onSubmit} />
      <MoviesCardList mediaNum={mediaNum} movieCards={movieCards} onSelect={onSelect}/>
      <Footer num={mediaNum} />
    </>
  );
}

export default Movies;
