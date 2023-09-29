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
import NotFound from '../NotFound/NotFound';

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

  const base = 'app__content';
  const baseClass = `${base} ${base}_pos_${mediaNum}`;

  const navigate = useNavigate();

  useMedia(getMediaBreakArea(), hanleMediaChanged);


  function hanleMediaChanged(event) {
    let num = getMediaBreakNumber();
    if (event.matches && num === mediaNum) {
      num -= 1;
    } else if (!event.matches && num === mediaNum) {
      num += 1;
    }
    if (num > 3) {num = 3;}
    else if (num < 1) {num = 1;}
    setMediaNum(num);
  }

  function hanleSignIn() {
    // если юзер известен, то по клику на войти сразу ведём на список карточек
    if (isUserKnown) {
      navigate('/movies', {replace: true});
    } else {
      navigate('/signin', {replace: true});
    }
  }

  function hanleLogIn() {
    // юзер авторизуется при клике в форме авторизации на войти
    // или в форме регистрации на зарегистрироваться
    setUserKnown(true);
    navigate('/movies', {replace: true});
  }

  function hanleLogOut() {
    // юзер деавторизуется в форме профиля при клике на выйти из аккаунта
    setUserKnown(false);
    navigate('/', {replace: true});
  }

  function hanleMenuClick() {
    setMenuOpen(true);
  }

  function hanleNavigationCloseClick() {
    setMenuOpen(false);
  }

  return (
    <div className="app">
      <div className={baseClass}>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Header
                mediaNum={mediaNum}
                isAuthorized={false}
                linkMain={'/'}
                linkSignUp={'/signup'}
                onSignInClick={hanleSignIn}/>
              <Main mediaNum={mediaNum} />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                mediaNum={mediaNum}
                linkMain={'/'}
                onSubmit={hanleLogIn}
                linkSignUp={'/signup'}/>
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                mediaNum={mediaNum}
                linkMain={'/'}
                onSubmit={hanleLogIn}
                linkSignIn={'/signin'}/>
            }
          />
          <Route
            path="/movies"
            element={
              <>
              <Header mediaNum={mediaNum}
                      isAuthorized={true}
                      linkMain={'/'}
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
                      isAuthorized={true}
                      linkMain={'/'}
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
                      isAuthorized={true}
                      linkMain={'/'}
                      linkMovies={'/movies'}
                      linkSavedMovies={'/saved-movies'}
                      linkProfile={'/profile'}
                      onMenuClick={hanleMenuClick}/>
              <Profile
                mediaNum={mediaNum}
                onOutClick={hanleLogOut}
                onEditClick={hanleLogIn}/>
              </>
            }
          />
          <Route
            path="/pre"
            element={
              <Preloader />
            }
          />
          <Route
            path="/*"
            element={
              <NotFound mediaNum={mediaNum} />
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
