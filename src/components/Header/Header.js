// import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menu from '../../images/icon_main.svg';
import './Header.css';

function Header({mediaNum, isAuthorized, logIn}) {
  const logoClass = `header__logo header__logo_pos_${mediaNum}`;
  if (isAuthorized) {
    const menuClass = `header__menu header__menu_pos_${mediaNum}`;
    return (
      <header className="header">
        <img className={logoClass} src={logo} alt="logo" />
        {mediaNum===1 ? (
        <>
        <nav className="header__nav">
          <NavLink to=""
            className={({isActive}) => `header__link header__link_align_right ${isActive ? "header__link_active" : ""}`}>
            Фильмы
          </NavLink>
          <NavLink to=""
            className={({isActive}) => `header__link header__link_align_left ${isActive ? "header__link_active" : ""}`}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <button className="header__profile-btn" href="#">Аккаунт</button>
        </>
      ) : (
        <>
        <img className={menuClass} src={menu} alt="menu" />
        </>

      )}
      </header>
    );
  }
  const authBtnClass = `header__auth-btn header__auth-btn_pos_${mediaNum}`;
  const authNavClass = `header__link-auth header__link-auth_pos_${mediaNum}`;
  return (
    <header className="header">
      <img className={logoClass} src={logo} alt="logo" />
      <>
      <nav className="header__nav">
        <NavLink className={authNavClass} to="#">Регистрация</NavLink>
      </nav>
      <div className={authBtnClass} onClick={logIn}>Войти</div>
      </>
    </header>
  );

}

export default Header;
