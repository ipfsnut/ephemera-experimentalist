import React from 'react';
import styles from './styles/NSTDisplay.module.css';
import { useExperiment } from '../../context/ExperimentContext';
import useResponseHandler from './Trial/useResponseHandler';
import useTrialCompletion from './Trial/useTrialCompletion';
import useTrialTransition from './Trial/useTrialTransition';
import useFocusManagement from './Trial/useFocusManagement';
import useKeyboardHandler from './Trial/useKeyboardHandler';
import useCaptureHandler from './Trial/useCaptureHandler';

const NSTDisplay = () => {
  const { state, dispatch } = useExperiment();
  const { currentTrial, currentDigit, isLoading, totalTrials = 14, currentDigitIndex = 0 } = state;

  const { handleResponse } = useResponseHandler(currentDigit);
  const { handleTrialComplete } = useTrialCompletion();
  const { isTransitioning, displayDigit } = useTrialTransition(currentDigit);
  const inputRef = useFocusManagement(isTransitioning);
  const { videoRef, captureFrame } = useCaptureHandler();

  const handlePause = () => {
    dispatch({ type: 'PAUSE_EXPERIMENT' });
  };

  useKeyboardHandler(handleResponse, isTransitioning, handlePause);

  const onResponse = async (response) => {
    const captureData = await captureFrame();
    await handleResponse({ ...response, captureData });

    if (currentDigitIndex === 14) {
      await handleTrialComplete({
        trialNumber: currentTrial,
        finalResponse: response,
        captureData
      });
      dispatch({ type: 'ADVANCE_TRIAL' });
    } else {
      dispatch({ type: 'ADVANCE_DIGIT' });
    }
  };

  return (
    <div className={`${styles.nstDisplay} ${isLoading ? styles.loading : ''}`} ref={inputRef} tabIndex={0}>
      <video ref={videoRef} className={styles.capturePreview} autoPlay muted />
      <div className={styles.trialInfo}>
        Trial {currentTrial} of {totalTrials}
      </div>
      <div className={`${styles.digitDisplay} ${isTransitioning ? styles.transitioning : ''}`}>
        {displayDigit}
      </div>
      <div className={styles.responseKeys}>
        <div>Press 'F' for Odd</div>
        <div>Press 'J' for Even</div>
        <div>Press 'ESC' to Pause</div>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${(currentDigitIndex / 15) * 100}%` }} />
      </div>
    </div>
  );
};

export default NSTDisplay;
