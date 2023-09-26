import SearchForm from '../Movies/SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function SavedMovies({mediaNum, movieCards}) {
  function handleSearchQuery() {
    console.log('запрос сохраненные');
  }
  return (
    <>
      <SearchForm mediaNum={mediaNum} onSubmit={handleSearchQuery} />
      <MoviesCardList mediaNum={mediaNum} movieCards={movieCards} />
      <section className='card-list__more'>
        <button className={`card-list__more-btn card-list__more-btn_pos_${mediaNum}`}>
          Ещё
        </button>
      </section>
      <Footer num={mediaNum} />
    </>

  );
}

export default SavedMovies;
