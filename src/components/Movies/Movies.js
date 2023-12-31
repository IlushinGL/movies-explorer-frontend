import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({
  mediaNum, movieCards, onSelect,
  onSubmit, isWait, message,
  selectionSet, hasMore, onShowMore,
  movieQuery
  })
{
  return (
    <>
      <SearchForm
        mediaNum={mediaNum}
        onSubmit={onSubmit}
        movieQuery={movieQuery}
        isWait={isWait} />
      <MoviesCardList
        mediaNum={mediaNum}
        movieCards={movieCards}
        onSelect={onSelect}
        hasMore={hasMore}
        onShowMore={onShowMore}
        isWait={isWait}
        message={message}
        selectionSet={selectionSet}/>
      <Footer num={mediaNum} />
    </>
  );
}

export default Movies;
