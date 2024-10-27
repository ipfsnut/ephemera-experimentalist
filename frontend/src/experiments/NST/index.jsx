import { useEffect, useState } from 'react'
import { useExperiment } from '../../context/ExperimentContext'
import useKeyboardHandler from './Trial/useKeyboardHandler'
import useResponseHandler from './Trial/useResponseHandler'
import useTrialTransition from './Trial/useTrialTransition'
const NST = () => {
  const { state: experimentState, dispatch } = useExperiment()
  const [currentDigit, setCurrentDigit] = useState(null)
  
  const { handleResponse, startTrial, metrics } = useResponseHandler(async (trialData) => {
    const response = await fetch(`/api/experiment/${experimentState.sessionId}/response`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        response: trialData.response,
        timestamp: Date.now()
      })
    })
    
    const result = await response.json()
    
    dispatch({
      type: 'RECORD_RESPONSE',
      payload: result
    })
    
    if (!result.trialProgress.isComplete) {
      getNextDigit()
    } else {
      dispatch({ type: 'COMPLETE_EXPERIMENT' })
    }
  })

  const { isTransitioning, displayDigit } = useTrialTransition(currentDigit)
  useKeyboardHandler(handleResponse, isTransitioning)

  const getNextDigit = async () => {
    console.log('Getting next digit for session:', experimentState.sessionId)
    const response = await fetch(`/api/experiment/${experimentState.sessionId}/next`)
    const data = await response.json()
    console.log('Next digit data:', data)  // Add this line
    
    if (data.captureRequired) {
      await fetch(`/api/experiment/${experimentState.sessionId}/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageData: null, // Will be handled by webcam capture
          captureData: { timestamp: Date.now() }
        })
      })
    }
    
    setCurrentDigit(data.digit)
  }

  useEffect(() => {
    const initializeTrialData = async () => {
      if (!experimentState.sessionId) {
        const response = await fetch('/api/experiment/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            experimentType: 'NST',
            config: {
              numTrials: 14,
              effortLevels: ['1', '2', '3', '4', '5', '6', '7']
            }
          })
        })
        const data = await response.json()
        console.log('Session start data:', data)

        dispatch({ type: 'SET_SESSION', payload: data.sessionId })
        
        console.log('Fetching first digit for session:', data.sessionId)
        const nextResponse = await fetch(`/api/experiment/${data.sessionId}/next`)
        const nextData = await nextResponse.json()
        console.log('First digit response:', nextData)
        setCurrentDigit(nextData.digit)
      }
    }

    initializeTrialData()
  }, [])
  useEffect(() => {
    if (!isTransitioning && currentDigit) {
      startTrial()
    }
  }, [currentDigit, isTransitioning, startTrial])

  return (
    <div className="nst-container">
      <div style={{ fontSize: '72px', fontFamily: 'monospace' }}>
        {displayDigit || ''}
      </div>
      <div className="instructions">
        Press 'F' for odd numbers, 'J' for even numbers
      </div>
    </div>
  )
}

export default NST