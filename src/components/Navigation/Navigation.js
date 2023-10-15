import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useEscapeKey, useOutsideClick } from '../../utils/customHooks';

function Navigation({mediaNum, linkMain, linkMovies, linkSavedMovies, onEditProfile, isOpened, handleOnClose}) {
  const base        = 'navigation';
  const state       = isOpened ? 'opened' : 'closed'
  const baseClass   = `${base}-conteiner`;
  const popClass    = `${base}-popup ${base}-popup_${state}`;
  const clsClass    = `${base}-close ${base}-close_pos${mediaNum}`;
  const setClass    = `${base}-items ${base}-items_pos${mediaNum}`;
  const itemClass   = `${base}-items__item ${base}-items__item_pos${mediaNum}`;
  const btnClass    = `${base}-btn ${base}-btn_pos${mediaNum}`;
  useEscapeKey(handleOnClose);
  useOutsideClick(handleOnClose);
  return (
    <div className={popClass}>
      <div className={baseClass}>
        <div
          className={clsClass}
          onClick={handleOnClose}>
        </div>
        <nav className={setClass}>
          <NavLink to={linkMain}
            className={({isActive}) => `${itemClass} ${isActive ? `${`${base}-items__item`}_active` : ""}`}
            onClick={handleOnClose}>
            Главная
          </NavLink>
          <NavLink to={linkMovies}
            className={({isActive}) => `${itemClass} ${isActive ? `${`${base}-items__item`}_active` : ""}`}
            onClick={handleOnClose}>
            Фильмы
          </NavLink>
          <NavLink to={linkSavedMovies}
            className={({isActive}) => `${itemClass} ${isActive ? `${`${base}-items__item`}_active` : ""}`}
            onClick={handleOnClose}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <button
          className={btnClass}
          type="button"
          onClick={onEditProfile}>
          Аккаунт
        </button>
        {/* <NavLink to={linkProfile}
          className={btnClass}
          onClick={handleOnClose}>
          Аккаунт
        </NavLink> */}
      </div>

    </div>

  );
}

export default Navigation;
