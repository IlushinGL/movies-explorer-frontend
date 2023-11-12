import { MOVIES_DATA } from './constants';

class Movies {
  constructor({server, movies}) {
    // на вход поступает один объект с указанными  ключами, значения которых
    // используются для конструирования запросов к серверу
    this._baseURL = server;
    this._movies = movies;
    this._headers = {
      'Content-Type': 'application/json',
    };
  }

  // _handleResponse(response) {
  //   if (response.ok) {
  //     return response;
  //   }
  //   return Promise.reject(response.status);
  // }

  getAll() {
    return fetch(
      this._baseURL + this._movies,
      {
      method: 'GET',
      headers: this._headers,
    })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res.map((item) => {
        item.image = this._baseURL + item.image.url;
        item.movieId = item.id;
        item.thumbnail = item.image;
        return item;
      })
    })
    .catch((err) => {return err;});
    // .then((res) => {return this._handleResponse(res, 'getAll')});
  }
}

export const apiMovies = new Movies(MOVIES_DATA);
