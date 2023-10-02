import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menu from '../../images/icon_main.svg';
import './Header.css';

function Header({mediaNum, isAuthorized, linkMain, linkMovies, linkSavedMovies, linkProfile, linkSignUp, onSignInClick, onMenuClick}) {
  const base         = 'header';
  const linkBase     = `${base}-link`;
  const baseClass    = `${base}`;
  const navClass     = `${base}-nav`;
  const authBtnClass = `${base}-auth-btn ${base}-auth-btn_pos_${mediaNum}`;
  const authNavClass = `${linkBase}-auth ${linkBase}-auth_pos_${mediaNum}`;
  const logoClass    = `${base}-logo ${base}-logo_pos_${mediaNum}`;
  const menuClass    = `${base}-menu ${base}-menu_pos_${mediaNum}`;
  const btnClass     = `${base}-profile-btn`;
  if (isAuthorized) {

    return (
      <header className={baseClass}>
        <NavLink className={logoClass} to={linkMain}>
          <img src={logo} alt="logo" />
        </NavLink>
        {mediaNum===1 ? (
        <>
        <nav className={navClass}>
          <NavLink to={linkMovies}
            className={({isActive}) => `${linkBase} ${linkBase}_align_right ${isActive ? `${linkBase}_active` : ""}`}>
            Фильмы
          </NavLink>
          <NavLink to={linkSavedMovies}
            className={({isActive}) => `${linkBase} ${linkBase}_align_left ${isActive ? `${linkBase}_active` : ""}`}>
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
        <img className={menuClass} src={menu} alt="menu" onClick={onMenuClick} />
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
