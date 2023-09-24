import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Auth/Profile/Profile';
import Navigation from '../Navigation/Navigation';

import getMoveSet from '../../utils/generateMovie';

import Preloader from '../Movies/Preloader/Preloader';

import { getMediaBreakArea, getMediaBreakNumber} from '../../utils/customFunction';
import { useMedia } from '../../utils/customHooks';

const movieSet = getMoveSet(19);
const savedMovieSet = getMoveSet(3);


function App() {
  const [mediaNum, setMediaNum] = React.useState(getMediaBreakNumber());
  const [isUserKnown, setUserKnown] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);


  useMedia(getMediaBreakArea(), hanleMediaChanged);


  function hanleMediaChanged() {
    setMediaNum(getMediaBreakNumber());
  }

  function hanleLogIn() {
    setUserKnown(true);
  }

  function hanleMenuClick() {
    setMenuOpen(true);
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
                      logIn={hanleLogIn}
                      onMenuClick={hanleMenuClick}/>
              <Movies mediaNum={mediaNum} movieCards={movieSet} />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
              <Header mediaNum={mediaNum}
                      isAuthorized={true}
                      logIn={hanleLogIn}
                      onMenuClick={hanleMenuClick}/>
              <SavedMovies mediaNum={mediaNum} movieCards={savedMovieSet} />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
              <Header mediaNum={mediaNum}
                      isAuthorized={true}
                      logIn={hanleLogIn}
                      onMenuClick={hanleMenuClick} />
              <Profile mediaNum={mediaNum} />
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

        <Navigation mediaNum={mediaNum} isOpened={isMenuOpen} />

      </div>

    </div>
  );
}

export default App;
