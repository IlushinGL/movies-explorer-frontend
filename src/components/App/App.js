import React from 'react';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { apiUserAuth } from '../../utils/MainApi';
import { apiMovies } from '../../utils/MoviesApi';
import { moviesPaging } from '../../utils/MoviesPaginator';

import ProtectedRoute from '../ProtectedRoute';
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

  const [currentUser, setCurrentUser] = React.useState('');
  const [userQuery, setUserQuery] = React.useState({search: '', short: false});
  const [meQuery, setMeQuery] = React.useState({search: '', short: false});

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


  React.useEffect(() => {
    // вспоминаем последний сеанс
    initUser();
    initUserCollection();
    setMessage('');
  }, []);

  React.useEffect(() => {
    function handleWindowSize() {
      // ОБРАБОТЧИК изменения ширины окна
      setTimeout(() => {
        // синхронизируем паджинатор с текущим медиа-запросом
        moviesPaging.setMedia(mediaNum);
        setCardCount(moviesPaging.getCount());
      }, 1000);
    }
    // добавляем слушателя изменения размера окна
    window.addEventListener("resize", handleWindowSize);
    // при размонтировании приложения удаляем слушателя
    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, [mediaNum]);

  React.useEffect(() => {
    // синхронизируем паджинатор с текущим медиа-запросом
    moviesPaging.setMedia(mediaNum);
    // если кол-во карточек = 0 значит это новый набор
    if (cardCount === 0) {
      // синхронизируем паджинатор с текущим размером массива
      moviesPaging.setLength(cards.length);
    }

    // если набор пустой, сообщаем об этом
    if (cards.length === 0) {
      setMessage('Ничего не найдено.');
    } else if (moviesPaging.getCount() !== cardCount) {
      // устанавливаем кол-во видимых карточек
      setCardCount(moviesPaging.getCount());
      setMessage('');
    }
  }, [cards, mediaNum, cardCount]);

  function handleMediaChanged(event) {
    // ЦЕНТРАЛЬНЫЙ ОБРАБОТЧИК брейк-поинтов адаптивной верстки
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

  function initUser() {
    // проверяем локальное хранилище
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
        // если результат пустой, значит юзера нет
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
    // коллекцию юзера и разместить ее в переменной состояния
    apiUserAuth.getAll()
    .then((res) => {
      setSavedCards(res);
      setMeQuery({search: '', short: false});
    })
    .catch((err) => {
      setSavedCards([]);
      console.log(err, 'Ошибка размещения коллекции.');
    })
  }

  function errMessage(err, text) {
    // генератор сообщения
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
        setMessage('');
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

  function handleRegister({name, email, password}) {
    // обработчик регистрации
    setWaitNum(2);
    apiUserAuth.register({name, email, password})
    .then((res) => {
      if (res) {
        errMessage(res, 'Проверьте адрес почты. Если вы уже проходили процедуру регистрации нажмите Войти.')
      } else {
        initUser();
        initUserCollection();
        setMessage('');
        navigate('/movies', {replace: true});
      }
    })
    .catch((err) => {
      console.log(err, 'Ошибка при регистрации.');
    })
    .finally(() => {
      setWaitNum(0);
    });
  }

  function handleProfile({name, email}) {
    // обработчик изменения данных профиля
    setWaitNum(3);
    apiUserAuth.update({name: name, email: email})
    .then((res) => {
      if (res) {
        errMessage(res, 'Вы не можете использовать этот email адрес.')
      } else {
        currentUser.name = name;
        currentUser.email = email;
        setMessage('Изменения профиля сохранены.');
      }
    })
    .catch((err) => {
      console.log(err, 'Ошибка при обновлении профиля.');
    })
    .finally(() => {
      setWaitNum(0);
    });
  }

  function handleSelectCard({data, add}) {
    // обработчик изменения принадлежности фильма библиотеки к коллекции
    // TODO: набросить прелоадер на картинку фильма на время выполнения операции
    setWaitNum(4);
    data.owner = currentUser._id;
    if (add) {
      apiUserAuth.addMovie(data)
      .then((res) => {
        if (res) {
          setSavedCards([res, ...savedCards]);
        }
      })
      .finally(() => { setWaitNum(0); })
    } else {
      const element = savedCards.filter((item) => item.movieId === data.id)[0];
      apiUserAuth.deleteMovie(element)
      .then((res) => {
        if (res) {
          setSavedCards((state) => state.filter((item) => item._id !== res._id));
        }
      })
      .finally(()  => { setWaitNum(0); })
    }
  }

  function handleSearchMovies({search, short}) {
    // обработчик поиска в библиотеке
    if (!search) {
      setMessage('Нужно указать ключевое слово.');
      return;
    }
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
      errMessage(err);
    })
    .finally(()  => { setWaitNum(0); })
  }

  function handleDeleteSavedCard(data) {
    // обработчик удаления фильма из коллекции
    // TODO: набросить прелоадер на картинку фильма на время выполнения операции
    setWaitNum(6);
    data.owner = currentUser._id;
    apiUserAuth.deleteMovie(data)
    .then((res) => {
      setSavedCards((state) => state.filter((item) => item._id !== res._id)); })
    .finally(()  => { setWaitNum(0); })
  }

  function handleSearchSavedMovies({search, short}) {
    // обработчик поиска в коллекции
    setMeQuery({search: search, short: short});
  }

  function handleLogOut() {
    // обработчик выхода пользователя
    apiUserAuth.setToken('');
    setCurrentUser('');
    setMessage('');
    navigate('/', {replace: true});
  }

  function handleClick() {
    // скрываем сообщение в формах
    setMessage(' ');
  }

  function handleSignIn() {
    // переход в форму авторизации
    handleClick();
    navigate('/signin', {replace: true});
  }

  function handleSignUp() {
    // переход в форму регистрации
    handleClick();
    navigate('/signup', {replace: true});
  }

  function handleEditIn() {
    // переход в форму изменения профиля
    setMenuOpen(false);
    handleClick();
    navigate('/profile', {replace: true});
  }

  function handleMenuClick() {
    // открыть бургер меню
    setMenuOpen(true);
  }

  function handleNavigationCloseClick() {
     // закрыть бургер меню
    setMenuOpen(false);
  }

  function handleMoreCards() {
     // обработать кнопку ещё
    setCardCount(moviesPaging.getMore());
  }

  function handleLinkToMovie() {
    // очистить сообщение при переходе к форме карточек библиотеки
    setMessage('');
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
                  onlinkMovies={handleLinkToMovie}
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
              element={<ProtectedRoute element={
                <>
                <Header
                  mediaNum={mediaLeter[mediaNum]}
                  isLight={true}
                  isAuthorized={true}
                  linkMain={'/'}
                  linkMovies={'/movies'}
                  onlinkMovies={handleLinkToMovie}
                  linkSavedMovies={'/saved-movies'}
                  onEditProfile={handleEditIn}
                  onMenuClick={handleMenuClick}/>
                <Movies
                  mediaNum={mediaLeter[mediaNum]}
                  movieQuery={userQuery}
                  movieCards={cards.slice(0, cardCount)}
                  selectionSet={savedMoviesIdSet(savedCards)}
                  hasMore={moviesPaging.hasMore()}
                  onShowMore={handleMoreCards}
                  onClick={handleClick}
                  message={message}
                  isWait={waitNum === 5 ? true: false}
                  onSubmit={handleSearchMovies}
                  onSelect={handleSelectCard}/>
                </>
              } loggedIn={apiUserAuth.isAuth()}/>}
            />
            <Route
              path="/saved-movies"
              element={<ProtectedRoute element={
                <>
                <Header
                  mediaNum={mediaLeter[mediaNum]}
                  isLight={true}
                  isAuthorized={true}
                  linkMain={'/'}
                  linkMovies={'/movies'}
                  onlinkMovies={handleLinkToMovie}
                  linkSavedMovies={'/saved-movies'}
                  onEditProfile={handleEditIn}
                  onMenuClick={handleMenuClick}/>
                <SavedMovies
                  mediaNum={mediaLeter[mediaNum]}
                  movieQuery={meQuery}
                  onDelete={handleDeleteSavedCard}
                  onSubmit={handleSearchSavedMovies}
                  movieCards={savedCards.filter((item) => isMatсh(item, meQuery.search, meQuery.short))} />
                </>
              } loggedIn={apiUserAuth.isAuth()}/>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={
                <>
                <Header
                  mediaNum={mediaLeter[mediaNum]}
                  isLight={true}
                  isAuthorized={true}
                  linkMain={'/'}
                  linkMovies={'/movies'}
                  onlinkMovies={handleLinkToMovie}
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
              } loggedIn={apiUserAuth.isAuth()}/>}
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
