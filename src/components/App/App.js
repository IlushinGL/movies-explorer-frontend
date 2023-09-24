import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Movies from '../Movies/Movies';

import getMoveSet from '../../utils/generateMovie';

import Preloader from '../Movies/Preloader/Preloader';

import { getMediaBreakArea, getMediaBreakNumber} from '../../utils/customFunction';
import { useMedia } from '../../utils/customHooks';

const movieSet = getMoveSet(19);


function App() {
  const [mediaNum, setMedia] = React.useState(getMediaBreakNumber());
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
      <div className="app__content redborder">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Header mediaNum={mediaNum}
                      isAuthorized={isUserKnown}
                      logIn={hanleLogIn}/>
              <Main mediaNum={mediaNum} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Login mediaNum={mediaNum} />
            }
          />
          <Route
            path="/signup"
            element={
              <Register mediaNum={mediaNum} />
            }
          />
          <Route
            path="/movies"
            element={
              <>
              <Header mediaNum={mediaNum}
                      isAuthorized={true}
                      logIn={hanleLogIn}/>
              <Movies mediaNum={mediaNum} movieCards={movieSet} optionSelected={false} />
              </>
            }
          />
          <Route
            path="/pre"
            element={
              <Preloader />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
