import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menu_light from '../../images/menu_light.svg';
import menu_dark from '../../images/menu_dark.svg';
import './Header.css';

function Header({
  mediaNum,
  isLight, isAuthorized,
  linkMain, linkMovies, linkSavedMovies, linkProfile, linkSignUp,
  onSignInClick, onMenuClick}) {

  const base         = 'header';
  const baseClass    = `${base} ${base}_pos${mediaNum} ${isLight ? (base + '_light'): ''}`;
  const logoClass    = `${base}-logo`;
  const navClass     = `${base}-nav`;
  const linkBase     = `${base}-nav__link`;
  const authNavClass = `${base}-nav__link-auth ${base}-nav__link-auth_pos${mediaNum}`;
  const authBtnClass = `${base}-auth-btn ${base}-auth-btn_pos${mediaNum}`;
  const btnClass     = `${base}-profile-btn`;
  const menuClass    = `${base}-menu ${base}-menu_pos${mediaNum}`;

  if (isAuthorized) {
    return (
      <header className={baseClass}>
        <nav className={navClass}>
          <NavLink className={logoClass} to={linkMain}>
            <img src={logo} alt="логотип" />
          </NavLink>
          {mediaNum !== 'c' ?
          (
            <>
              <NavLink to={linkMovies}
                className={({isActive}) =>
                  `${linkBase}
                   ${isLight ? `${linkBase}_light` : ''}
                   ${linkBase}_align_right
                   ${isActive ? `${linkBase}_active` : ''}`}>
                Фильмы
              </NavLink>
              <NavLink to={linkSavedMovies}
                className={({isActive}) =>
                  `${linkBase}
                   ${isLight ? `${linkBase}_light` : ''}
                   ${linkBase}_align_left
                   ${isActive ? `${linkBase}_active` : ''}`}>
                Сохранённые фильмы
              </NavLink>

              <NavLink to={linkProfile}
                className={btnClass}>
                Аккаунт
              </NavLink>
            </>
          ) :
          (
            <img
              className={menuClass}
              src={!isLight ? menu_light : menu_dark}
              alt="меню"
              onClick={onMenuClick} />
          )}
        </nav>
      </header>
    );
  }

  return (
    <header className={baseClass}>
      <nav className={navClass}>
        <NavLink className={logoClass} to={linkMain}>
          <img src={logo} alt="логотип" />
        </NavLink>
        <NavLink className={authNavClass} to={linkSignUp}>Регистрация</NavLink>
        <button className={authBtnClass} onClick={onSignInClick} type="button" >Войти</button>
      </nav>
    </header>
  );
}

export default Header;
