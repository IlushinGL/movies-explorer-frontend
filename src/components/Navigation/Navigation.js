import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useEscapeKey, useOutsideClick } from '../../utils/customHooks';

function Navigation({mediaNum, linkMain, linkMovies, linkSavedMovies, linkProfile, isOpened, handleOnClose}) {
  const base        = 'navigation';
  const state       = isOpened ? 'opened' : 'closed'
  const baseClass   = `${base}__conteiner ${base}__conteiner_pos_${mediaNum}`;
  const popClass    = `${base}-popup
                       ${base}-popup_pos_${mediaNum}
                       ${base}-popup_${state}`;
  const clsClass    = `${base}__close ${base}__close_pos_${mediaNum}`;
  const setClass    = `${base}__items-set ${base}__items-set_pos_${mediaNum}`;
  const itemClass   = `${base}__item ${base}__item_pos_${mediaNum}`;
  const btnClass    = `${base}__btn ${base}__btn_pos_${mediaNum}`;
  useEscapeKey(handleOnClose);
  useOutsideClick(handleOnClose);
  return (
    <div className={popClass}>
      <div className={baseClass}>
        <div
          className={clsClass}
          onClick={handleOnClose}>
        </div>
        <div className={setClass}>
          <NavLink to={linkMain}
            className={itemClass}
            onClick={handleOnClose}>
            Главная
          </NavLink>
          <NavLink to={linkMovies}
            className={itemClass}
            onClick={handleOnClose}>
            Фильмы
          </NavLink>
          <NavLink to={linkSavedMovies}
            className={itemClass}
            onClick={handleOnClose}>
            Сохранённые фильмы
          </NavLink>
        </div>
        <NavLink to={linkProfile}
          className={btnClass}
          onClick={handleOnClose}>
          Аккаунт
        </NavLink>
      </div>

    </div>

  );
}

export default Navigation;
