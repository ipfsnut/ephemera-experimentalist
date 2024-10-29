import React, { useState, useEffect } from 'react'
import { useExperiment } from '../../context/ExperimentContext'
import TrialDisplay from './Trial/TrialDisplay'
import useTrialCompletion from './Trial/useTrialCompletion'

const NST = () => {
  const { dispatch } = useExperiment()
  const { handleTrialComplete } = useTrialCompletion()
  const [experimentState, setExperimentState] = useState({
    currentDigit: null,
    currentTrial: 0,
    currentDigitIndex: 0,
    totalTrials: 0,
    trials: [],
    sessionId: null
  })

  useEffect(() => {
    initializeExperiment()
  }, [])

  const initializeExperiment = async () => {
    const config = await fetch('/api/experiments/nst/config').then(r => r.json())
    const response = await fetch('/api/experiments/nst/trials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(r => r.json())

    setExperimentState({
      currentDigit: response.currentDigit,
      currentTrial: 0,
      currentDigitIndex: 0,
      totalTrials: config.numTrials,
      trials: response.trials,
      sessionId: response.sessionId
    })
    
    dispatch({ type: 'SET_SESSION', payload: response.sessionId })
  }

  const handleDigitComplete = async () => {
    const nextDigitResponse = await fetch(`/api/experiments/nst/next-digit?trialIndex=${experimentState.currentTrial}&digitIndex=${experimentState.currentDigitIndex + 1}`).then(r => r.json())
    
    if (nextDigitResponse.isLastDigit) {
      setExperimentState(prev => ({
        ...prev,
        currentTrial: prev.currentTrial + 1,
        currentDigitIndex: 0,
        currentDigit: nextDigitResponse.nextTrialDigit
      }))
      handleTrialComplete()
    } else {
      setExperimentState(prev => ({
        ...prev,
        currentDigit: nextDigitResponse.digit,
        currentDigitIndex: nextDigitResponse.digitIndex
      }))
    }
  }

  return experimentState.currentDigit ? (
    <TrialDisplay
      currentDigit={experimentState.currentDigit}
      currentTrial={experimentState.currentTrial}
      totalTrials={experimentState.totalTrials}
      onDigitComplete={handleDigitComplete}
    />
  ) : (
    <div>Loading experiment...</div>
  )
}

export default NST