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
  const baseClass    = `${base} ${isLight ? (base + '_light'): ''}`;
  const navClass     = `${base}__nav`;
  const linkBase     = `${base}-nav__link`;
  const authBtnClass = `${base}__auth-btn ${base}__auth-btn_pos_${mediaNum}`;
  const authNavClass = `${base}__link-auth ${base}__link-auth_pos_${mediaNum}`;
  const logoClass    = `${base}__logo ${base}__logo_pos_${mediaNum}`;
  const menuClass    = `${base}__menu ${base}__menu_pos_${mediaNum}`;
  const btnClass     = `${base}__profile-btn`;

  if (isAuthorized) {
    return (
      <header className={baseClass}>
        <NavLink className={logoClass} to={linkMain}>
          <img src={logo} alt="лого" />
        </NavLink>
        {mediaNum===1 ? (
        <>
        <nav className={navClass}>
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
        </nav>
        <NavLink to={linkProfile}
          className={btnClass}>
          Аккаунт
        </NavLink>
        </>
      ) : (
        <>
        <img className={menuClass} src={!isLight ? menu_light : menu_dark} alt="меню" onClick={onMenuClick} />
        </>

      )}
      </header>
    );
  }

  return (
    <header className={baseClass}>
      <NavLink className={logoClass} to={linkMain}>
        <img src={logo} alt="logo" />
      </NavLink>
      <>
      <nav className={navClass}>
        <NavLink className={authNavClass} to={linkSignUp}>Регистрация</NavLink>
      </nav>
      <button className={authBtnClass} onClick={onSignInClick}>Войти</button>
      </>
    </header>
  );

}

export default Header;
