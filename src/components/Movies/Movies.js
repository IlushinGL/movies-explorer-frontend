import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({
  mediaNum, movieCards, onSelect,
  onSubmit, isWait, message,
  selectionSet, hasMore, onShowMore, movieQuery
  })
{
  return (
    <>
      <SearchForm
        mediaNum={mediaNum}
        name='movies'
        onSubmit={onSubmit}
        movieQuery={movieQuery} />
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
