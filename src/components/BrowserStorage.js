class BrowserStorage {
  constructor() {
    this._jwt = localStorage.getItem('jwt') || '';
    this._data = localStorage.getItem('data') || '';
    this._userId = '';
  }

  getJWT() {
    return this._jwt;
  }
  getData() {
    if (this._data) {
      return JSON.parse(this._data);
    }
    return '';
  }
  setJwt(jwt, userId) {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
      this._userId = userId;
    } else {
      localStorage.removeItem('jwt');
      this._userId = '';
    }
    this._jwt = jwt;
    this.setData('');
  }
  setData(data) {
    if (data) {
      const res = data;
      res.owner = this._userId
      this._data = JSON.stringify(res);
      localStorage.setItem('data', this._data);
    } else {
      this._data = '';
      localStorage.removeItem('data');
    }
  }



}

export const dataStorage = new BrowserStorage();
