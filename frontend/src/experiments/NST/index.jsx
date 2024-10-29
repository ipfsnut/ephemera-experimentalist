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
    totalTrials: 0,
    trials: []
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
      currentDigit: response.trials[0].number,
      currentTrial: 0,
      totalTrials: config.numTrials,
      trials: response.trials
    })
  }

  return experimentState.currentDigit ? (
    <TrialDisplay
      currentDigit={experimentState.currentDigit}
      currentTrial={experimentState.currentTrial}
      totalTrials={experimentState.totalTrials}
      onTrialComplete={handleTrialComplete}
    />
  ) : (
    <div>Loading experiment...</div>
  )
}

export default NST