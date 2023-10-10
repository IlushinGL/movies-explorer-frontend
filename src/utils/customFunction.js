import {MEDIA_POINT1, MEDIA_POINT2, MEDIA_POINT3} from './constants';

export function getMediaBreakArea() {
  return [MEDIA_POINT1, MEDIA_POINT2, MEDIA_POINT3];
}

export function getMediaBreakNumber(mediaWidth = document.documentElement.clientWidth) {
  const area = getMediaBreakArea();
  for (let i = 0; i < area.length; i++) {
    if (mediaWidth > area[i]) {
      return i + 1;
    }
  }
  return null;
}

export function getDurationStr(minutes) {
  const hour = Math.floor(minutes/60);
  const rest = minutes - hour * 60;
  return `${hour}ч${rest}м`;
}
