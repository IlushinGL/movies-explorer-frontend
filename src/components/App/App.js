import React from 'react';
import logo from '../../images/pic_landing.svg';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />

      </header>
    </div>
  );
}

export default App;
