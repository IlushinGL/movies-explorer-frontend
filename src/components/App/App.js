import React from 'react';
import logo from '../../images/pic_landing.svg';
import './App.css';
import Header from '../Header/Header';
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
        <img src={logo} className="app__logo" alt="logo" />

      </section>
    </div>
  );
}

export default App;
