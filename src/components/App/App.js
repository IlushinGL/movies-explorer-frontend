import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import { getMediaBreakArea, getMediaBreakNumber} from '../../utils/customFunction';
import { useMedia } from '../../utils/customHooks';

function App() {
  const [media, setMedia] = React.useState(getMediaBreakNumber());
  const [isUserKnown, setUserKnown] = React.useState(false);
  useMedia(getMediaBreakArea(), hanleMediaChanged);

  function hanleMediaChanged() {
    setMedia(getMediaBreakNumber());
  }

  return (
    <div className="app">

      <section className="app__content">
        <Header num={media} isAuthorized={isUserKnown} />
        <Promo num={media} />
        <NavTab num={media} />
        <AboutProject num={media} />
        <Techs num={media} />
        <AboutMe num={media} />
        <Footer num={media} />
      </section>
    </div>
  );
}

export default App;
