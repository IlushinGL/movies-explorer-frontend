import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList({
  mediaNum, movieCards, onSelect, isWait, message, selectionSet, hasMore, onShowMore}) {
  const base        = 'cards';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const listClass   = `${base}__list ${base}__list_pos${mediaNum}`;
  const btnClass    = `${base}__more-btn`;

  return (
    <section className={baseClass}>
      {isWait ? <Preloader />: (message ||
        <>
          <div className={listClass}>
            {movieCards.map((card) => (
              <MoviesCard
                key={'' + card.id}
                mediaNum={mediaNum}
                card={card}
                selectionSet={selectionSet}
                onSelect={onSelect}
              />))
            }
          </div>
          {hasMore ?
            <button className={btnClass} onClick={onShowMore}>
              Ещё
            </button>
          :
          ''}

        </>
      )}
    </section>
  );
}

export default MoviesCardList;
