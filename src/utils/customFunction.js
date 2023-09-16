import {MEDIA_POINT1, MEDIA_POINT2} from './constants';

export function getMediaBreakArea() {
  return [MEDIA_POINT1, MEDIA_POINT2];
}

export function getMediaBreakNumber() {
  const winW = window.innerWidth;
  console.log(winW);
  if (winW >= MEDIA_POINT1) { return 1; }
  if (winW >= MEDIA_POINT2) { return 2; }
  return 3;
}
