import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({mediaNum, movieCards}) {
  const base = 'card-list';
  const baseClass   = `${base} ${base}_pos_${mediaNum}`;

  return (
    <section className={baseClass}>
      {movieCards.map((card) => (
        <MoviesCard
          key={'' + card.moveId}
          mediaNum={mediaNum}
          card={card}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;
