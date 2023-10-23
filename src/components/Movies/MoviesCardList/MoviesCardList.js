import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({mediaNum, movieCards, onSelect}) {
  const base        = 'cards';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const listClass   = `${base}__list ${base}__list_pos${mediaNum}`;
  const btnClass    = `${base}__more-btn`;

  return (
    <section className={baseClass}>
      <div className={listClass}>
        {movieCards.map((card) => (
          <MoviesCard
            key={'' + card.id}
            mediaNum={mediaNum}
            card={card}
            onSelect={onSelect}
          />
        ))}
      </div>
      <button className={btnClass}>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
