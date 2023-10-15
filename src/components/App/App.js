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
  const [isUserKnown, setUserKnown] = React.useState(localStorage.getItem('jwt'));
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [message, setMessage] = React.useState(' ');
  const [waitNum, setWaitNum] = React.useState(0);

  const base = 'app-content';
  const contentClass = `${base} ${base}_pos${mediaLeter[mediaNum]}`;

  const navigate = useNavigate();

  useMedia(getMediaBreakArea(), hanleMediaChanged);

  React.useEffect(() =>  {
    setMessage(' ');
    if (isUserKnown) {
      apiUserAuth.checkToken(isUserKnown)
      .then((res)  => { setCurrentUser(res); })
      .catch((err) => { setMessage(err); });
    }
  }, [isUserKnown]);

  function errMessage(err) {
    return `Во время запроса произошла ошибка ${err}. ` +
      'Возможно, проблема с соединением или сервер недоступен. ' +
      'Подождите немного и попробуйте ещё раз.';
  }

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
    setMessage(' ');
    navigate('/signin', {replace: true});
  }

  function hanleLogIn({email, password}) {
    setWaitNum(1);
    setUserKnown(undefined);
    apiUserAuth.login({email, password})
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setUserKnown(res.token);

      navigate('/movies', {replace: true});
    })
    .catch((err) => {
      if (Number(err) < 500) {
        setMessage('Почта или пароль указаны неверно');
      } else {
        errMessage(err);
      }
    });
    setWaitNum(0);
  }

  function hanleSignUp() {
    setMessage(' ');
    navigate('/signup', {replace: true});
  }

  function hanleRegister({name, email, password}) {
    setWaitNum(2);
    setUserKnown(undefined);
    apiUserAuth.register({name, email, password})
    .then(() => {
      apiUserAuth.login({email, password})
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserKnown(res.token);
        navigate('/movies', {replace: true});
      })
      .catch((err) => {
        if (Number(err) < 500) {
          setMessage('Почта или пароль указаны неверно');
        } else {
          errMessage(err);
        }
      })
    })
    .catch((err) => {
      if (Number(err) < 500) {
        setMessage('Почта указана неверно или вы уже проходили процедуру регистрации.');
      } else {
        errMessage(err);
      }
    });
    setWaitNum(0);
  }

  function hanleEditIn() {
    setMenuOpen(false);
    setMessage(' ');
    navigate('/profile', {replace: true});
  }

  function hanleProfile({name, email}) {
    // юзер меняет данные

    apiUserAuth.update({name, email, jwt: isUserKnown})
    .then((res) => {
      console.log(res);
      setCurrentUser(res);
      navigate('/movies', {replace: true});
    })
    .catch((err) => {
      setMessage(`${err} Что-то пошло не так...`);
    });
  }

  function hanleLogOut() {
    localStorage.removeItem('jwt');
    setUserKnown(undefined);
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
                  onEditProfile={hanleEditIn}
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
                  onSignUp={hanleSignUp}
                  message={message}
                  isWait={waitNum === 1 ? true: false}/>
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  mediaNum={mediaLeter[mediaNum]}
                  linkMain={'/'}
                  onSubmit={hanleRegister}
                  onSignIn={hanleSignIn}
                  message={message}
                  isWait={waitNum === 2 ? true: false}/>
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
                  onEditProfile={hanleEditIn}
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
                  onEditProfile={hanleEditIn}
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
                  onEditProfile={hanleEditIn}
                  onMenuClick={hanleMenuClick}/>
                <Profile
                  mediaNum={mediaLeter[mediaNum]}
                  onOutClick={hanleLogOut}
                  onEditClick={hanleProfile}
                  message={message}/>
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
            onEditProfile={hanleEditIn}
            isOpened={isMenuOpen}
            handleOnClose={hanleNavigationCloseClick} />

        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
