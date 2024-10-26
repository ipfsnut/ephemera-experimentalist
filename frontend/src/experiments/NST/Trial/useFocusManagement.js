import { useEffect, useRef } from 'react';

const useFocusManagement = (isTransitioning) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isTransitioning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTransitioning]);

  return inputRef;
};
