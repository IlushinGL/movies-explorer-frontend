import { useEffect, useCallback } from 'react';
import { HOOKS_DATA } from './constants';

export function useEscapeKey(handleClose) {
  const handleEscKey = useCallback((event) => {
    if (event.key === HOOKS_DATA.keyNameEsc) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener(HOOKS_DATA.keyEventType, handleEscKey);
    return () => {
      document.removeEventListener(HOOKS_DATA.keyEventType, handleEscKey);
    };
  });
}

export function useOutsideClick(handleClose) {
  const handleClick = useCallback((event) => {
    if (event.target.classList.contains(HOOKS_DATA.modalArea)) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    document.addEventListener(HOOKS_DATA.mouseUp, handleClick);
    return () => {
      document.removeEventListener(HOOKS_DATA.mouseUp, handleClick);
    };
  });
}

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
