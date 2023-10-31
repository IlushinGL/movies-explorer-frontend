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

import { getMediaBreakArea, getMediaBreakNumber} from '../../utils/customFunction';
import { useMedia } from '../../utils/customHooks';

const mediaLeter = ['?', 'a', 'b', 'c'];

function App() {
  const [mediaNum, setMediaNum] = React.useState(getMediaBreakNumber());

  const [appInit, setAppInit] = React.useState(true);

  const [currentUser, setCurrentUser] = React.useState('');
  const [userQuery, setUserQuery] = React.useState({search: '', short: false});

  const [cards, setCards] = React.useState([]);
  const [cardCount, setCardCount] = React.useState(0);
  const [savedCards, setSavedCards] = React.useState([]);

  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [message, setMessage] = React.useState(' ');
  const [waitNum, setWaitNum] = React.useState(0);

  const base = 'app-content';
  const contentClass = `${base} ${base}_pos${mediaLeter[mediaNum]}`;

  const navigate = useNavigate();

  useMedia(getMediaBreakArea(), handleMediaChanged);
  window.addEventListener("resize", handleWindowSize);

  React.useEffect(() => {
    // вспоминаем последний сеанс
    initUser();
    initUserCollection();
  }, []);

  React.useEffect(() => {
    // при загрузке приложения на промо страницу
    if (appInit) {
      setAppInit(false);
      navigate('/', {replace: true});
    }
  }, [appInit, navigate])

  React.useEffect(() => {
    // нарисовать отфильтрованные фильмы библиотеки
    if (cardCount === 0) {
      setMessage('');
      moviesPaging.setMedia(mediaNum);
      moviesPaging.setLength(cards.length);
    }
    setCardCount(moviesPaging.getCount());
    // если набор пустой - сообщаем
    if (cardCount === 0 && cards.length === 0) {
      setMessage('Ничего не найдено.');
    }
  }, [cards, mediaNum, cardCount]);

  function initUser() {
    // смотрим на локальное хранилище
    apiUserAuth.getStoredData()
    .then((res) => {
      if (res) {
        // если результат не пустой пытаемся разместить юзера
        // в переменных состояния
        setCurrentUser({
          _id:   res.profile._id,
          name:  res.profile.name,
          email: res.profile.email,
        });
        if (res.storage) {
          setUserQuery({
            search: res.storage.search,
            short: res.storage.short,
          });
          setCards(res.storage.cards);
        } else {
          setUserQuery({
            search: '',
            short: false,
          });
          setCards([]);
        }
        setCardCount(0);
      } else {
        // если результат пустой
        setCurrentUser('');
      }
    })
    .catch((err) => {
      setCurrentUser('');
      console.log(err, 'Ошибка размещения пользователя.');
    })
  }

   function initUserCollection() {
    // пробуем достать с сервера
    // коллекцию юзера и рзместить ее в переменной состояния
    apiUserAuth.getAll()
    .then((res) => {
      setSavedCards(res);
    })
    .catch((err) => {
      setSavedCards([]);
      console.log(err, 'Ошибка размещения коллекции.');
    })
   }

  function errMessage(err, text) {
    if (err < 500) {
      setMessage(text);
    } else {
      setMessage(
        `Во время запроса произошла ошибка ${err}. ` +
        'Возможно, проблема с соединением или сервер недоступен. ' +
        'Подождите немного и попробуйте ещё раз.'
      );
    }
  }

  function savedMoviesIdSet(array) {
    // возвращаем массив индексов сохраненных фильмов
    return array.map((item) => {
      return item.movieId;
    });
  }

  function handleWindowSize() {
    // перерисовываем набор отфильтрованных фильмов библиотеки
    // при изменении ширины окна
    setTimeout(() => {
      setCardCount(moviesPaging.getCount());
    }, 1000);
  }

  function isMatсh(card, search, short) {
    // проверить карточку на текст и длительность
    const shortLen = 40;
    const strSearch = search.trim().toLowerCase();
    let res;
    if (strSearch) {
      const strIn = (card.nameRU + card.nameEN).split(' ').join('');
      res = strIn.toLowerCase().indexOf(strSearch) >= 0;
    } else {
      res = true;
    }
    if (short) {
      res = (card.duration <= shortLen) && res;
    }
    return res;
  }



  function handleMediaChanged(event) {
    // ЦЕНТРАЛЬНЫЙ ОБРАБОТЧИК брекпоинтов адатвной верстки
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

  function handleClick() {
    // скрываем сообщения в формах
    setMessage(' ');
  }

  function handleSignIn() {
    setMessage(' ');
    navigate('/signin', {replace: true});
  }

  function handleLogIn({email, password}) {
    // обработчик авторизации
    setWaitNum(1);
    apiUserAuth.login({email, password})
    .then((res) => {
      if (res) {
        errMessage(res, 'Почта или пароль указаны неверно.')
      } else {
        initUser();
        initUserCollection();
        navigate('/movies', {replace: true});
      }
    })
    .catch((err) => {
      console.log(err, 'Ошибка при авторизации.');
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
    apiUserAuth.register({name, email, password})
    .then((res) => {
      setMessage(' ');
      apiUserAuth.login({email, password})
      .then((res) => {
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
    // setMessage(' ');
    setMessage('');
    navigate('/profile', {replace: true});
  }

  function handleProfile({name, email}) {
    setWaitNum(3);
    apiUserAuth.update({name, email})
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
    apiUserAuth.setToken('');
    setCurrentUser('');
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
      apiUserAuth.addMovie(data)
      .then((res) => {
        setSavedCards([res, ...savedCards]); })
      .catch((err) => {
        setMessage(err.message) })
      .finally(()  => { setWaitNum(0); })
    } else {
      const element = savedCards.filter((item) => item.movieId === data.id)[0];
      apiUserAuth.deleteMovie(element)
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
    apiUserAuth.deleteMovie(data)
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
      const data = res.filter((item) => isMatсh(item, search, short));
      localStorage.setItem('data',
        JSON.stringify(
           {
             owner: currentUser._id,
             search: search,
             short: short,
             cards:data,
           }
        )
      )
      setUserQuery({
        search: search,
        short: short,
      });
      setCards(data);
      setCardCount(0);
    })
    .catch((err) => {
      setMessage(errMessage(err));
    })
    .finally(()  => { setWaitNum(0); })
  }

  function handleMoreCards() {
    setCardCount(moviesPaging.getMore());
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
                  isAuthorized={currentUser}
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
                  movieQuery={userQuery}
                  movieCards={cards.slice(0, cardCount)}
                  // movieCards={cards}
                  selectionSet={savedMoviesIdSet(savedCards)}
                  hasMore={moviesPaging.hasMore()}
                  onShowMore={handleMoreCards}
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
