import { useState, useEffect } from 'react';

const useTrialTransition = (currentDigit) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayDigit, setDisplayDigit] = useState(currentDigit);

  useEffect(() => {
    if (currentDigit !== displayDigit) {
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayDigit(currentDigit);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentDigit]);

  return { isTransitioning, displayDigit };
};

export default useTrialTransition;
