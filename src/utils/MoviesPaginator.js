import { CARDS_TBL } from './constants';

class MoviesPaginator {
  constructor(tbl) {
    this._tbl = tbl;
    this._dataLen = 0;
    this._visibleCount = 0;
    this._mediaNum = -1;
  }

  _getElementsInRow() {
    const winWight = window.innerWidth;
    const count = (winWight + 2 * this._tbl[this._mediaNum][1] - 2 * this._tbl[this._mediaNum][2]) /
                  (this._tbl[this._mediaNum][0] + 2 * this._tbl[this._mediaNum][1]);
    return Math.floor(count);
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
      countVisible = this._visibleCount;
    } else if (countVisible < this._dataLen) {
      countVisible = Math.floor(countVisible/countInRow) * countInRow;
    } else {
      countVisible = this._dataLen
    }
    return countVisible;
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
