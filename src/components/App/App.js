import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { apiUserAuth } from '../../utils/MainApi';
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

import Preloader from '../Preloader/Preloader';

import { getMediaBreakArea, getMediaBreakNumber} from '../../utils/customFunction';
import { useMedia } from '../../utils/customHooks';

const movieSet = getMoveSet(19);
const savedMovieSet = getMoveSet(3);
const mediaLeter = ['?', 'a', 'b', 'c'];


function App() {
  const [currentUser, setCurrentUser] = React.useState({
    _id: '-1',
    name: null,
    email: null,
  });
  const [mediaNum, setMediaNum] = React.useState(getMediaBreakNumber());
  const [isUserKnown, setUserKnown] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [message, setMessage] = React.useState(' ');

  const base = 'app-content';
  const contentClass = `${base} ${base}_pos${mediaLeter[mediaNum]}`;

  const navigate = useNavigate();

  useMedia(getMediaBreakArea(), hanleMediaChanged);

  React.useEffect(() =>  {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      apiUserAuth.checkToken(jwt)
      .then((res) => {
        setCurrentUser(res);
        setMessage(res);
        setUserKnown(true);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        setMessage(`${err}: Токен просрочен. Нужно вспомнить регистрационные данные.`);
        setUserKnown(false);
      });
    } else {
      setMessage('Токен не найден. Нужно вспомнить регистрационные данные.');
      setUserKnown(false);
    }
  }, [navigate]);

  function hanleMediaChanged(event) {
    // получить параметр медиа-запроса
    const winW = parseInt(event.media.split(' ')[1], 10);
    // получить номер медиа-запроса
    const num = getMediaBreakNumber(winW);
    if (num) {
      if (mediaNum === getMediaBreakArea().length && num < mediaNum) {
        setMediaNum(num);
      } else if (num !== mediaNum) {
        setMediaNum(num);
      } else {
        setMediaNum(num - 1);
      }
    }
  }

  function hanleSignIn() {
    // если юзер известен, то по клику на войти сразу ведём на список карточек
    if (isUserKnown) {
      navigate('/movies', {replace: true});
    } else {
      navigate('/signin', {replace: true});
    }
  }

  function hanleLogIn({email, password}) {
    // юзер авторизуется
    apiUserAuth.login({email, password})
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setUserKnown(true);
      navigate('/movies', {replace: true});
    })
    .catch((err) => {
      setUserKnown(false);
      setMessage(`${err} <Неудачная попытка авторизации.>`);
    });
  }

  function hanleRegister({name, email}) {
    // юзер регестрируется и авторизуется
    setCurrentUser({name, email})
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className={contentClass}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                <Header
                  mediaNum={mediaLeter[mediaNum]}
                  isLight={false}
                  isAuthorized={isUserKnown}
                  linkMain={'/'}
                  linkMovies={'/movies'}
                  linkSavedMovies={'/saved-movies'}
                  linkProfile={'/profile'}
                  onMenuClick={hanleMenuClick}
                  linkSignUp={'/signup'}
                  onSignInClick={hanleSignIn}/>
                <Main mediaNum={mediaLeter[mediaNum]} />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  mediaNum={mediaLeter[mediaNum]}
                  linkMain={'/'}
                  onSubmit={hanleLogIn}
                  linkSignUp={'/signup'}
                  message={message}/>
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  mediaNum={mediaLeter[mediaNum]}
                  linkMain={'/'}
                  onSubmit={hanleRegister}
                  userApi={apiUserAuth}
                  linkSignIn={'/signin'}/>
              }
            />
            <Route
              path="/movies"
              element={
                <>
                <Header
                  mediaNum={mediaLeter[mediaNum]}
                  isLight={true}
                  isAuthorized={true}
                  linkMain={'/'}
                  linkMovies={'/movies'}
                  linkSavedMovies={'/saved-movies'}
                  linkProfile={'/profile'}
                  onMenuClick={hanleMenuClick}/>
                <Movies mediaNum={mediaLeter[mediaNum]} movieCards={movieSet} />
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                <Header
                  mediaNum={mediaLeter[mediaNum]}
                  isLight={true}
                  isAuthorized={true}
                  linkMain={'/'}
                  linkMovies={'/movies'}
                  linkSavedMovies={'/saved-movies'}
                  linkProfile={'/profile'}
                  onMenuClick={hanleMenuClick}/>
                <SavedMovies mediaNum={mediaLeter[mediaNum]} movieCards={savedMovieSet} />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                <Header
                  mediaNum={mediaLeter[mediaNum]}
                  isLight={true}
                  isAuthorized={true}
                  linkMain={'/'}
                  linkMovies={'/movies'}
                  linkSavedMovies={'/saved-movies'}
                  linkProfile={'/profile'}
                  onMenuClick={hanleMenuClick}/>
                <Profile
                  mediaNum={mediaLeter[mediaNum]}
                  onOutClick={hanleLogOut}
                  onEditClick={hanleRegister}/>
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
                <NotFound mediaNum={mediaLeter[mediaNum]} />
              }
            />
          </Routes>

          <Navigation
            mediaNum={mediaLeter[mediaNum]}
            linkMain={'/'}
            linkMovies={'/movies'}
            linkSavedMovies={'/saved-movies'}
            linkProfile={'/profile'}
            isOpened={isMenuOpen}
            handleOnClose={hanleNavigationCloseClick} />

        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
