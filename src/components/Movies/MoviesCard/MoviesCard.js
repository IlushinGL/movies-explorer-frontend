import { Link } from 'react-router-dom';
import './MoviesCard.css';
import like_yes from '../../../images/like_yes.svg';
import like_no from '../../../images/like_no.svg';
import { getDurationStr } from '../../../utils/customFunction';

function MoviesCard({mediaNum, card, onSelect, selectionSet}) {
  const base        = 'card';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const imgClass    = `${base}__img ${base}__img_pos${mediaNum}`;
  const capClass    = `${base}__caption`;
  const titleClass  = `${base}__caption-title`;
  const txtClass    = `${base}__caption-txt ${base}__caption-txt_pos${mediaNum}`;
  const likeClass   = `${base}__caption-img`;
  const timeClass   = `${base}__caption-duration`;

  const isSelected = selectionSet.some(item => item === card.movieId);

  function handleSelected() {
    onSelect({data: card, add: !isSelected});
  }

  return (
    <div className={baseClass}>
      <Link
          to={card.trailerLink}
          target="_blank"
          rel="noopener noreferrer">
           <img
            className={imgClass}
            src={card.image}
            alt={'фильм'+ card.id} />
      </Link>
      <div className={capClass}>
        <div className={titleClass}>
          <h2 className={txtClass}>{card.nameRU}</h2>
          <img
            onClick={handleSelected}
            className={likeClass}
            src={isSelected ? like_yes : like_no}
            alt={isSelected ? 'да' : 'нет'} />
        </div>
        <p className={timeClass}>
          {getDurationStr(card.duration)}
        </p>
      </div>
    </div>
  );
}

export default MoviesCard;
