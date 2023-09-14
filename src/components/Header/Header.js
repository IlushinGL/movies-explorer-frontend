// import React from 'react';
import logo from '../../images/logo.svg';
import main from '../../images/icon_main.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" />
      <div>Фильмы</div>
      <div>Сохранённые фильмы</div>
      <img src={main} alt="main" />
    </header>
  );
}

export default Header;
