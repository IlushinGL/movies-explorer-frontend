import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Auth/Login/Login';

import { getMediaBreakArea, getMediaBreakNumber} from '../../utils/customFunction';
import { useMedia } from '../../utils/customHooks';

function App() {
  const [media, setMedia] = React.useState(getMediaBreakNumber());
  const [isUserKnown, setUserKnown] = React.useState(false);
  useMedia(getMediaBreakArea(), hanleMediaChanged);

  function hanleMediaChanged() {
    setMedia(getMediaBreakNumber());
  }

  function hanleLogIn() {
    setUserKnown(true);
  }

  return (
    <div className="app">
      <div className="app__content">
        {!isUserKnown ? (
          <>
          <Header mediaNum={media}
                  isAuthorized={isUserKnown}
                  logIn={hanleLogIn}/>
          <Main mediaNum={media} />
          </>
        ) : (
          <Login num={media} />
        )}
      </div>
    </div>
  );
}

export default App;
