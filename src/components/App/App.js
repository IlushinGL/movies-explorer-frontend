import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
  // const [menuItem, setMenuItem] = React.useState(0);
  const [isUserKnown, setUserKnown] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  useMedia(getMediaBreakArea(), hanleMediaChanged);

  function hanleMediaChanged() {
    setMediaNum(getMediaBreakNumber());
  }

  function hanleSignIn() {
    navigate('/signin', {replace: true});
  }

  function hanleLogIn() {
    setUserKnown(true);
    navigate('/movies', {replace: true});
  }

  function hanleMenuClick() {
    setMenuOpen(true);
  }

  function hanleNavigationCloseClick() {
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <div className="app__content">
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Header
                mediaNum={mediaNum}
                isAuthorized={isUserKnown}
                linkSignUp={'/signup'}
                onSignInClick={hanleSignIn}/>
              <Main mediaNum={mediaNum} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Login mediaNum={mediaNum} onSubmit={hanleLogIn}/>
            }
          />
          <Route
            path="/signup"
            element={
              <Register mediaNum={mediaNum} onSubmit={hanleLogIn}/>
            }
          />
          <Route
            path="/movies"
            element={
              <>
              {/* mediaNum, isAuthorized, linkMovies, linkSavedMovies, linkProfile, linkSignUp, onSignInClick, onMenuClick */}
              <Header mediaNum={mediaNum}
                      isAuthorized={isUserKnown}
                      linkMovies={'/movies'}
                      linkSavedMovies={'/saved-movies'}
                      linkProfile={'/profile'}
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
                      isAuthorized={isUserKnown}
                      linkMovies={'/movies'}
                      linkSavedMovies={'/saved-movies'}
                      linkProfile={'/profile'}
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
                      isAuthorized={isUserKnown}
                      linkMovies={'/movies'}
                      linkSavedMovies={'/saved-movies'}
                      linkProfile={'/profile'}
                      onMenuClick={hanleMenuClick}/>
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

        <Navigation
          mediaNum={mediaNum}
          linkMain={'/'}
          linkMovies={'/movies'}
          linkSavedMovies={'/saved-movies'}
          linkProfile={'/profile'}
          isOpened={isMenuOpen}
          handleOnClose={hanleNavigationCloseClick} />

      </div>

    </div>
  );
}

export default App;
