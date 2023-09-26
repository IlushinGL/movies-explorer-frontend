import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

import '../../Movies/MoviesCard/MoviesCard.css';
import delicon from '../../../images/delete.png';
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

  return (
    <div className={baseClass}>
      <img
        className={imgClass}
        src={card.image}
        alt={'film'+ card.moveId} />
      <div className={capClass}>
        <div className={titleClass}>
          <h2 className={txtClass}>{card.nameRU}</h2>
          <img
            className={likeClass}
            src={delicon}
            alt={'del'} />
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