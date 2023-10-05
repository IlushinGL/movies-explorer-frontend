import {MEDIA_POINT1, MEDIA_POINT2} from './constants';

export function getMediaBreakArea() {
  return [MEDIA_POINT1, MEDIA_POINT2];
}

export function getMediaBreakNumber() {
  // const winW = window.innerWidth;
  const winW = document.documentElement.clientWidth
  // const winW = document.documentElement.scrollWidth
  if (winW > MEDIA_POINT1) { return 1; }
  if (winW > MEDIA_POINT2) { return 2; }
  return 3;
}

export function getDurationStr(minutes) {
  const hour = Math.floor(minutes/60);
  const rest = minutes - hour * 60;
  return `${hour}ч${rest}м`;
}
