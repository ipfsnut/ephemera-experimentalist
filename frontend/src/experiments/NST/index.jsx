import { useEffect, useState } from 'react'
import { useExperiment } from '../../context/ExperimentContext'
import useKeyboardHandler from './Trial/useKeyboardHandler'
import useResponseHandler from './Trial/useResponseHandler'
import useTrialTransition from './Trial/useTrialTransition'

const NST = () => {
  const { state: experimentState, dispatch } = useExperiment()
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
    const initializeTrialData = async () => {
      const response = await fetch('/api/experiment/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: experimentState.sessionId,
          experimentType: 'NST',
          config: {
            numTrials: 14,
            effortLevels: ['1', '2', '3', '4', '5', '6', '7']
          }
        })
      })
      
      const data = await response.json()
      console.log('Generated trial data:', data)
      dispatch({ type: 'SET_TRIAL_DATA', payload: data.trials })
    }

    if (experimentState.sessionId) {
      initializeTrialData()
    }
  }, [experimentState.sessionId, dispatch])

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