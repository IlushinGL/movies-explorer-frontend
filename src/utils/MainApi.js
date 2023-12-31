import { ME_DATA } from './constants';

class Auth {
  constructor({server, signUp, signIn, user, movies}) {
    // на вход поступает один объект с указанными  ключами, значения которых
    // используются для конструирования запросов к серверу
    this._baseURL = server;
    this._signUp  = signUp;
    this._signIn  = signIn;
    this._user    = user;
    this._movies  = movies;
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': '',
    };
  }

  setToken(jwt) {
    this._headers.Authorization = jwt;
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
    localStorage.removeItem('data');
  }

  getStoredData() {
    // вспомнить пользователя
    const jwt = localStorage.getItem('jwt') || '';
    this._headers.Authorization = jwt;
    return fetch(
      this._baseURL + this._user,
      {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: Проверка токена. ${res.statusText}.`)
      }
      return res.json();
    })
    .then((profile) => {
      const user = {};
      user.profile = {
        _id:   profile._id,
        name:  profile.name,
        email: profile.email,
      };
      const data = localStorage.getItem('data') || '';
      if (data) {
        const store = JSON.parse(data);
        if (store.owner === profile._id) {
          user.storage = store;
        } else {
          // если данные чужие - удалить
          user.storage = '';
          localStorage.removeItem('data');
        }
      } else {
        user.storage = '';
      }
      return user;
    })
    .catch((err) => {
      console.log(err);
      return '';
    })
  }

  isAuth() {
    return this._headers.Authorization ? true : false;
  }

  register({name, email, password}) {
    // зарегестрировать пользователя
    this.setToken('');
    let errCode = 0;
    return fetch(
      this._baseURL + this._signUp,
      {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then((res) => {
      if (!res.ok) {
        errCode = res.status;
        throw new Error(`${res.status}: Регистрация. ${res.statusText}.`)
      }
      return res.json();
    })
    .then((newUser) => {
      return this.login({email: newUser.email, password: password});
    })
    .catch((err) => {console.log(err); return errCode;})
  }

  login({email, password}) {
    // авторизировать пользователя
    this.setToken('');
    let errCode = 0;
    return fetch(
      this._baseURL + this._signIn,
      {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then((res) => {
      if (!res.ok) {
        errCode = res.status;
        throw new Error(`${res.status}: Авторизация. ${res.statusText}.`)
      }
      return res.json();
    })
    .then((res) => {
      this.setToken(res.token);
      return 0;
    })
    .catch((err) => {console.log(err); return errCode;})
  }

  update({name, email}) {
    // обновить профиль пользователя
    let errCode = 0;
    return fetch(
      this._baseURL + this._user,
      {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then((res) => {
      if (!res.ok) {
        errCode = res.status;
        throw new Error(`${res.status}: Изменение профиля. ${res.statusText}.`)
      }
      return 0;
    })
    .catch((err) => {console.log(err); return errCode;})
  }

  addMovie(data) {
    // добавить фильм в коллекцию
    const {id, ...newData} = data;
    return fetch(
      this._baseURL + this._movies,
      {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newData)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: Добавить фильм. ${res.statusText}.`)
      }
      return res.json();
    })
    .catch((err) => {console.log(err); return ''})
  }

  deleteMovie(data) {
    // удалить фильм из коллекции
    return fetch(
      this._baseURL + this._movies + '/' + data._id,
      {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({owner: data.owner})
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: Удалить фильм. ${res.statusText}.`)
      }
      return res.json();
    })
    .catch((err) => {console.log(err); return''})
  }

  getAll() {
    // получить всю коллекцию фильмов пользователя
    return fetch(
      this._baseURL + this._movies,
      {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status}: Получить личную колекцию. ${res.statusText}.`)
      }
      return res.json();})
    .catch((err) => { console.log(err); return []; })
  }
}

export const apiUserAuth = new Auth(ME_DATA);
