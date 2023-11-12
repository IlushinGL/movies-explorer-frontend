import { Link } from 'react-router-dom';
import '../../Movies/MoviesCard/MoviesCard.css';
import delicon from '../../../images/delete.svg';
import { getDurationStr } from '../../../utils/customFunction';

function MoviesCard({mediaNum, card, onDelete}) {
  const base        = 'card';
  const baseClass   = `${base} ${base}_pos${mediaNum}`;
  const imgClass    = `${base}__img ${base}__img_pos${mediaNum}`;
  const capClass    = `${base}__caption`;
  const titleClass  = `${base}__caption-title`;
  const txtClass    = `${base}__caption-txt ${base}__caption-txt_pos${mediaNum}`;
  const likeClass   = `${base}__caption-img`;
  const timeClass   = `${base}__caption-duration`;

  function handleClick() {
    onDelete(card);
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
            className={likeClass}
            src={delicon}
            onClick={handleClick}
            alt={'удалить'} />
        </div>
        <p className={timeClass}>
          {getDurationStr(card.duration)}
        </p>
      </div>
    </div>
  );
}

export default MoviesCard;
