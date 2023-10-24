import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { apiUserAuth } from '../../utils/MainApi';
import { apiMovies } from '../../utils/MoviesApi';
import { moviesPaging } from '../../utils/MoviesPaginator';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Login from '../Auth/Login/Login';
import Register from '../Auth/Register/Register';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Auth/Profile/Profile';
import Navigation from '../Navigation/Navigation';
import NotFound from '../NotFound/NotFound';

// import getMoveSet from '../../utils/generateMovie';

import Preloader from '../Preloader/Preloader';

import { getMediaBreakArea, getMediaBreakNumber} from '../../utils/customFunction';
import { useMedia } from '../../utils/customHooks';
const mediaLeter = ['?', 'a', 'b', 'c'];

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    _id: '-1',
    name: null,
    email: null,

  });
  const [cards, setCards] = React.useState([]);
  const [savedCards, setSavedCards] = React.useState([]);
  const [cardCount, setCardCout] = React.useState(0);
  const [mediaNum, setMediaNum] = React.useState(getMediaBreakNumber());
  const [isUserKnown, setUserKnown] = React.useState(localStorage.getItem('jwt'));
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [message, setMessage] = React.useState(' ');
  const [waitNum, setWaitNum] = React.useState(0);

  const base = 'app-content';
  const contentClass = `${base} ${base}_pos${mediaLeter[mediaNum]}`;

  const navigate = useNavigate();

  useMedia(getMediaBreakArea(), handleMediaChanged);
  window.addEventListener("resize", handleWindowSize);

  React.useEffect(() => {
    if (isUserKnown) {
      apiUserAuth.checkToken(isUserKnown)
      .then((res) => {
        setCurrentUser(res);
        apiUserAuth.getAll(isUserKnown)
        .then((res) => {
          setSavedCards(Array.from(res));
        })
        .catch((err) => {
          console.log(`${err} <Не удалось получить карточки пользователя>`);
        })
      })
      .catch((err) => {
        console.log(`${err} <Не удалось получить информацию о пользователе>`);
      })
    }
  }, [isUserKnown]);

  React.useEffect(() =>  {
    moviesPaging.setMedia(mediaNum);
  }, [mediaNum]);

  function errMessage(err) {
    return `Во время запроса произошла ошибка ${err}. ` +
      'Возможно, проблема с соединением или сервер недоступен. ' +
      'Подождите немного и попробуйте ещё раз.';
  }

  function savedMoviesIdSet(array) {
    return array.map((item) => {
      return item.movieId;
    });
  }

  function handleWindowSize() {
    setTimeout(() => {
      setCardCout(moviesPaging.getCount());
    }, 1000);
  }


  function handleClick() {
    setMessage(' ');
  }

  function handleMediaChanged(event) {
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

  function handleSignIn() {
    setMessage(' ');
    navigate('/signin', {replace: true});
  }

  function handleLogIn({email, password}) {
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
        setMessage(errMessage(err));
      }
    })
    .finally(() => {
      setWaitNum(0);
    });
  }

  function handleSignUp() {
    setMessage(' ');
    navigate('/signup', {replace: true});
  }

  function handleRegister({name, email, password}) {
    setWaitNum(2);
    setUserKnown(undefined);
    apiUserAuth.register({name, email, password})
    .then((res) => {
      setMessage(' ');
      apiUserAuth.login({email, password})
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserKnown(res.token);
        navigate('/movies', {replace: true});
      })
    })
    .catch((err) => {
      if (Number(err) < 500) {
        setMessage('Проверьте адрес почты. Если вы уже проходили процедуру регистрации нажмите Войти.');
      } else {
        setMessage(errMessage(err));
      }
    })
    .finally(() => {
      setWaitNum(0);
    });
  }

  function handleEditIn() {
    setMenuOpen(false);
    setMessage(' ');
    navigate('/profile', {replace: true});
  }

  function handleProfile({name, email}) {
    setWaitNum(3);
    apiUserAuth.update({name, email, jwt: isUserKnown})
    .then((res) => {
      setCurrentUser(res);
      navigate('/movies', {replace: true});
    })
    .catch((err) => {
      if (Number(err) < 500) {
        setMessage('Вы не можете использовать этот email адрес.');
      } else {
        setMessage(errMessage(err));
      }
    })
    .finally(() => {
      setWaitNum(0);
    });
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setUserKnown(undefined);
    navigate('/', {replace: true});
  }

  function handleMenuClick() {
    setMenuOpen(true);
  }

  function handleNavigationCloseClick() {
    setMenuOpen(false);
  }

  function handleSelectCard({data, add}) {
    setWaitNum(4);
    data.owner = currentUser._id;
    if (add) {
      apiUserAuth.addMovie(data, isUserKnown)
      .then((res) => {
        setSavedCards([res, ...savedCards]); })
      .catch((err) => {
        setMessage(err.message) })
      .finally(()  => { setWaitNum(0); })
    } else {
      const element = savedCards.filter((item) => item.movieId === data.id)[0];
      apiUserAuth.deleteMovie(element, isUserKnown)
      .then((res) => {
        setSavedCards((state) => state.filter((item) => item._id !== res._id)); })
      .catch((err) => {
        setMessage(err.message) })
      .finally(()  => { setWaitNum(0); })
    }
  }

  function handleDeleteSavedCard(data) {
    setWaitNum(6);
    data.owner = currentUser._id;
    apiUserAuth.deleteMovie(data, isUserKnown)
    .then((res) => {
      setSavedCards((state) => state.filter((item) => item._id !== res._id)); })
    .catch((err) => {
      setMessage(err.message) })
    .finally(()  => { setWaitNum(0); })
  }

  function handleSearchMovies({search, short}) {
    setWaitNum(5);
    setMessage('');
    apiMovies.getAll()
    .then((res) => {
      moviesPaging.setLength(res.length);
      setCardCout(moviesPaging.getCount());
      setCards(res);
    })
    .catch((err) => {
      setMessage(errMessage(err));
    })
    .finally(()  => { setWaitNum(0); })

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
                  onEditProfile={handleEditIn}
                  onMenuClick={handleMenuClick}
                  linkSignUp={'/signup'}
                  onSignInClick={handleSignIn}/>
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
                  onSubmit={handleLogIn}
                  onSignUp={handleSignUp}
                  message={message}
                  isWait={waitNum === 1 ? true: false}
                  onClick={handleClick}/>
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  mediaNum={mediaLeter[mediaNum]}
                  linkMain={'/'}
                  onSubmit={handleRegister}
                  onSignIn={handleSignIn}
                  message={message}
                  isWait={waitNum === 2 ? true: false}
                  onClick={handleClick}/>
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
                  onEditProfile={handleEditIn}
                  onMenuClick={handleMenuClick}/>
                <Movies
                  mediaNum={mediaLeter[mediaNum]}
                  movieCards={cards.slice(0, cardCount)}
                  selectionSet={savedMoviesIdSet(savedCards)}
                  message={message}
                  isWait={waitNum === 5 ? true: false}
                  onSubmit={handleSearchMovies}
                  onSelect={handleSelectCard}/>
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
                  onEditProfile={handleEditIn}
                  onMenuClick={handleMenuClick}/>
                <SavedMovies
                  mediaNum={mediaLeter[mediaNum]}
                  onDelete={handleDeleteSavedCard}
                  movieCards={savedCards} />
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
                  onEditProfile={handleEditIn}
                  onMenuClick={handleMenuClick}/>
                <Profile
                  mediaNum={mediaLeter[mediaNum]}
                  onOutClick={handleLogOut}
                  onEditClick={handleProfile}
                  message={message}
                  isWait={waitNum === 3 ? true: false}
                  onClick={handleClick}/>
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
            onEditProfile={handleEditIn}
            isOpened={isMenuOpen}
            handleOnClose={handleNavigationCloseClick} />

        </div>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
