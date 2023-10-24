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

  _handleResponse(response, errTitle) {
    if (response.ok) {
      return response.json();
    }
    // return Promise.reject(`AuthErr_${errTitle}=${response.status}`);
    return Promise.reject(response.status);
  }

  register({name, email, password}) {
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
    .then((res) => {return this._handleResponse(res, 'register')});
  }

  login({email, password}) {
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
    .then((res) => {return this._handleResponse(res, 'login')});
  }

  update({name, email, jwt}) {
    this._headers.Authorization = jwt;
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
    .then((res) => {return this._handleResponse(res, 'update')});
  }

  checkToken(jwt) {
    this._headers.Authorization = jwt;
    return fetch(
      this._baseURL + this._user,
      {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {return this._handleResponse(res, 'checkToken')});
  }

  addMovie(data, jwt) {
    this._headers.Authorization = jwt;
    const {id: _, ...newData} = data;
    return fetch(
      this._baseURL + this._movies,
      {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newData)
    })
    .then((res) => {return this._handleResponse(res, 'addMovie')});
  }

  deleteMovie(data, jwt) {
    this._headers.Authorization = jwt;
    return fetch(
      this._baseURL + this._movies + '/' + data._id,
      {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({owner: data.owner})
    })
    .then((res) => {return this._handleResponse(res, 'deleteMovie')});
  }

  getAll(jwt) {
    this._headers.Authorization = jwt;
    return fetch(
      this._baseURL + this._movies,
      {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {return this._handleResponse(res, 'getAllMovies')});
  }

}

export const apiUserAuth = new Auth(ME_DATA);
