import { useEffect } from 'react';

const useKeyboardHandler = (onResponse, isTransitioning) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isTransitioning) return;
      
      if (event.key === 'f' || event.key === 'j') {
        const response = event.key === 'f' ? 'odd' : 'even';
        onResponse(response);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTransitioning, onResponse]);
};

export default useKeyboardHandler;
