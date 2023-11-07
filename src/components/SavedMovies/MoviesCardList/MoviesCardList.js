import MoviesCard from '../MoviesCard/MoviesCard';
import '../../Movies/MoviesCardList/MoviesCardList.css';

function MoviesCardList({mediaNum, movieCards, onDelete}) {
  const base        = 'cards';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const listClass   = `${base}__list ${base}__list_pos${mediaNum}`;

  const message = movieCards.length === 0? 'Ничего не найдено' : '';

  return (
    <section className={baseClass}>
      {message ||
        <div className={listClass}>
          {movieCards.map((card) => (
            <MoviesCard
              key={'' + card._id}
              mediaNum={mediaNum}
              onDelete={onDelete}
              card={card}
            />
          ))}
        </div>
      }

    </section>
  );
}

export default MoviesCardList;
