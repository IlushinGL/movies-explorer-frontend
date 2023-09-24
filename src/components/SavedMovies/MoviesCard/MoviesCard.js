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
  const txtClass    = `${base}__caption-txt`;
  const likeClass   = `${base}__caption-img`;
  const timeClass   = `${base}__caption-duration`;

  function handleDelClick() {

  }

  // const currentUser = React.useContext(CurrentUserContext);
  // const isOwn = card.owner === currentUser._id;
  // const isLiked = card.likes.some(item => item === currentUser._id);
  // const srcLike = isLiked ? [likeYesPath, 'yes'] : [likeNoPath, 'no'];

  // function handleClick() {
  //   onCardClick(card);
  // }

  // function handleLikeClick() {
  //   onCardLike(card);
  // }

  // function handleDeleteClick() {
  //   onCardDelete(card);
  // }

  return (
    <div className={baseClass}>
      <img
        // onClick={handleClick}
        className={imgClass}
        src={card.image}
        alt={'фильм'+ card.moveId} />
      <div className={capClass}>
        <div className={titleClass}>
          <h2 className={txtClass}>{card.nameRU}</h2>
          <img
            onClick={handleDelClick}
            className={likeClass}
            src={delicon}
            alt={'del'} />
        </div>
        <p className={timeClass}>
          {getDurationStr(card.duration)}
        </p>
        {/* <h2 className="elements__element-text">{card.name}</h2>
        <button type="button" className="elements__element-favour" onClick={handleLikeClick}>
          <img className="icon" src={srcLike[0]} alt={srcLike[1]} />
          <div className="likes">{card.likes.length}</div>
        </button> */}
      </div>
      {/* {isOwn && <button type="button" className='elements__element-trash' onClick={handleDeleteClick} />} */}
    </div>
  );
}

export default MoviesCard;
