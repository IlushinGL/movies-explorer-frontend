import React from 'react';
import logo from '../../images/pic_landing.svg';
import './App.css';
import Header from '../Header/Header';
import { useMedia } from '../../utils/customHooks';

function App() {
  const [media, setMedia] = React.useState(document.documentElement.scrollWidth);
  useMedia([1279, 767], hanleMediaChanged);

  function hanleMediaChanged(point) {
    console.log(media, point);
    setMedia(point);
  }

  return (
    <div className="app">

      <section className="app__content">
        <Header />
        <img src={logo} className="app__logo" alt="logo" />

      </section>
    </div>
  );
}

export default App;
