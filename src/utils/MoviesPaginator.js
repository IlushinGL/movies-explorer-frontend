import { CARDS_TBL } from './constants';

class MoviesPaginator {
  constructor(tbl) {
    this._tbl = tbl;
    this._dataLen = 0;
    this._visibleCount = 0;
    this._mediaNum = -1;
  }

  _getElementsInRow() {
    const winWight = document.documentElement.clientWidth;
    return Math.floor(
      (winWight - this._tbl[this._mediaNum][1] - 2 * this._tbl[this._mediaNum][2]) /
      (this._tbl[this._mediaNum][0] + this._tbl[this._mediaNum][1])
    );
  }

  setLength(num) {
    this._dataLen = num;
  }
  setMedia(num) {
    this._mediaNum = num - 1;
  }
  getStartCount() {
    const countInRow = this._getElementsInRow();
    let count;
    if (countInRow > 1 ) {
      count = countInRow * 4;
    } else {
      count = 5;
    }

    if (count > this._dataLen) {
      this._visibleCount = this._dataLen;
    } else {
      this._visibleCount = count;
    }
    return this._visibleCount;
  }
  haveMore() {
    return this._visibleCount < this._dataLen;
  }
  getMore() {
    const rest =  this._dataLen - this._visibleCount;
    const count = this._getElementsInRow() * this._tbl[this._mediaNum][4];
    this._visibleCount = count > rest? this._dataLen: this._visibleCount + count;
    return this._visibleCount;
  }
}

export const moviesPaging = new MoviesPaginator(CARDS_TBL);
