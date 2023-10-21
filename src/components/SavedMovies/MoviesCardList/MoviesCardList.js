import MoviesCard from '../MoviesCard/MoviesCard';
import '../../Movies/MoviesCardList/MoviesCardList.css';

function MoviesCardList({mediaNum, movieCards}) {
  const base        = 'cards';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const listClass   = `${base}__list ${base}__list_pos${mediaNum}`;
  const btnClass    = `${base}__more-btn`;

  return (
    <section className={baseClass}>
      <div className={listClass}>
        {movieCards.map((card) => (
          <MoviesCard
            key={'' + card._id}
            mediaNum={mediaNum}
            card={card}
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
