import { AUTH_DATA } from './constants';

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
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  _handleResponse(response, errTitle) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`AuthErr_${errTitle}=${response.status}`);
  }

  register({name, email, password}) {
    console.log(name, email, password);
    return fetch(
      this._baseURL + this._signUp,
      {
      method: 'POST',
      mode: 'no-cors',
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
    console.log(this._baseURL + this._signIn, email, password);
    return fetch(
      this._baseURL + this._signIn,
      {
      method: 'POST',
      mode: 'no-cors',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    })
    .then((res) => {return this._handleResponse(res, 'login')});
  }



  checkToken(jwt) {
    return fetch(
      this._baseURL + this._user,
      {
      method: 'GET',
      headers: {...this._headers, ...{ Authorization : `Bearer ${jwt}` }},
    })
    .then((res) => {return this._handleResponse(res, 'checkToken')});
  }
}

export const apiUserAuth = new Auth(AUTH_DATA);
