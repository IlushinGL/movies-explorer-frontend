import { CARDS_TBL } from '../utils/constants';

class MoviesPaginator {
  constructor(tbl) {
    this._tbl = tbl;
    this._dataLen = 0;
    this._visibleCount = 0;
    this._mediaNum = -1;
  }

  _getElementsInRow() {
    const winWight = document.documentElement.clientWidth;
    const count = (winWight + this._tbl[this._mediaNum][1] - 2 * this._tbl[this._mediaNum][2]) /
                  (this._tbl[this._mediaNum][0] + this._tbl[this._mediaNum][1]);
    return Math.floor(count) || 1;
  }

  setLength(num) {
    this._dataLen = num;
    this._visibleCount = 0;
  }

  setMedia(num) {
    this._mediaNum = num - 1;
  }

  getCount() {
    const countInRow = this._getElementsInRow();
    let countVisible = this._visibleCount;
    if (countVisible === 0) {
      let count = 5;
      if (countInRow > 1 ) {count = countInRow * 4;}
      if (count > this._dataLen) {count = this._dataLen;}
      countVisible = count;
    } else if (countVisible < this._dataLen) {
      countVisible = Math.floor(countVisible/countInRow) * countInRow;
    } else {
      countVisible = this._dataLen
    }
    this._visibleCount = countVisible;
    return this._visibleCount;
  }

  hasMore() {
    return this._visibleCount < this._dataLen;
  }
  getMore() {
    const rest =  this._dataLen - this._visibleCount;
    const countInRow = this._getElementsInRow();
    let count = 2;
    if (countInRow > 1 ) {count = countInRow;}
    this._visibleCount = count > rest? this._dataLen: this._visibleCount + count;
    return this._visibleCount;
  }
}

export const moviesPaging = new MoviesPaginator(CARDS_TBL);
