import { useEffect, useCallback } from 'react';

export function useMedia(points, hanleMediaChanged) {
  const mQuerys = points.map((point) => {
    return window.matchMedia(`(min-width: ${point}px)`);
  });
  const handleMedia = useCallback((event) => {
    hanleMediaChanged();
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
