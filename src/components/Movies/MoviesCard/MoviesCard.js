import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

import './MoviesCard.css';
import like_yes from '../../../images/like_yes.png';
import like_no from '../../../images/like_no.png';
import { getDurationStr } from '../../../utils/customFunction';

function MoviesCard({mediaNum, card}) {
  const base        = 'card';
  const baseClass   = `${base} ${base}_pos_${mediaNum}`;
  const imgClass    = `${base}__img ${base}__img_pos_${mediaNum}`;
  const capClass    = `${base}__caption`;
  const titleClass  = `${base}__caption-title`;
  const txtClass    = `${base}__caption-txt ${base}__caption-txt_pos_${mediaNum}`;
  const likeClass   = `${base}__caption-img`;
  const timeClass   = `${base}__caption-duration`;

  const [isSelected, setSelected] = React.useState(false);

  function handleSelected() {
    setSelected(!isSelected);
  }

  return (
    <div className={baseClass}>
      <img
        className={imgClass}
        src={card.image}
        alt={'фильм'+ card.moveId} />
      <div className={capClass}>
        <div className={titleClass}>
          <h2 className={txtClass}>{card.nameRU}</h2>
          <img
            onClick={handleSelected}
            className={likeClass}
            src={isSelected ? like_yes : like_no}
            alt={isSelected ? 'отмечен' : 'не отмечен'} />
        </div>
        <p className={timeClass}>
          {getDurationStr(card.duration)}
        </p>
      </div>
      {/* {isOwn && <button type="button" className='elements__element-trash' onClick={handleDeleteClick} />} */}
    </div>
  );
}

export default MoviesCard;
