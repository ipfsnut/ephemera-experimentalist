import { useEffect, useState } from 'react'
import { useExperiment } from '../../context/ExperimentContext'
import useKeyboardHandler from './Trial/useKeyboardHandler'
import useResponseHandler from './Trial/useResponseHandler'
import useTrialTransition from './Trial/useTrialTransition'

const NST = () => {
  const { state: experimentState } = useExperiment()
  const [state, setState] = useState({
    currentTrial: 0,
    currentDigit: 0,
    responses: []
  })
  
  const { handleResponse, startTrial, metrics } = useResponseHandler((trialData) => {
    setState(prev => ({
      ...prev,
      responses: [...prev.responses, trialData]
    }))
  })

  useEffect(() => {
    console.log('Experiment state in NST:', experimentState)
    if (experimentState.sessionId) {
      // Initialize experiment
    }
  }, [experimentState])

  useEffect(() => {
    console.log('Component State:', state)
    console.log('Session ID from context:', experimentState.sessionId)
    console.log('Response metrics:', metrics)
  }, [state, experimentState.sessionId, metrics])

  return (
    <div className="nst-container">
      <div style={{ fontSize: '72px', fontFamily: 'monospace' }}>
        {state.currentDigit || ''}
      </div>
    </div>
  )
}

export default NST