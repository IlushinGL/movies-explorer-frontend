import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({mediaNum, movieCards, optionSelected}) {
  return (
    <>
      <SearchForm mediaNum={mediaNum} optionSelected={optionSelected} />
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

export default Movies;
