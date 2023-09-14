import { useEffect, useCallback } from 'react';

export function useMedia(points, hanleMediaChanged) {
  const mQuerys = points.map((point) => {
    return window.matchMedia(`(min-width: ${point}px)`);
  });
  const handleMedia = useCallback((event) => {
    if (event.matches) {
      hanleMediaChanged('+' + event.media);
    } else {
      hanleMediaChanged('-' + event.media);
    }
  }, [hanleMediaChanged]);

  useEffect(() => {
    mQuerys.forEach((mQuery) => {
      mQuery.addEventListener('change', handleMedia);
    });
    return () => {
      mQuerys.forEach((mQuery) => {
        mQuery.removeEventListener('change', handleMedia);
      });
    };
  });
}
