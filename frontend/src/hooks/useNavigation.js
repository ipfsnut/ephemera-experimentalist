import { useNavigate } from 'react-router-dom';
import { useExperiment } from '../context/ExperimentContext';

export const useExperimentNavigation = () => {
  const navigate = useNavigate();
  const { state } = useExperiment();

  const goToExperiment = () => {
    navigate('/experiment');
  };

  const goToCompletion = () => {
    if (state.isComplete) {
      navigate('/complete');
    }
  };

  const restartExperiment = () => {
    navigate('/', { replace: true });
  };

  return {
    goToExperiment,
    goToCompletion,
    restartExperiment
  };
};
