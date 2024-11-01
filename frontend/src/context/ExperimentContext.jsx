import React, { createContext, useContext, useReducer } from 'react'
import { experimentService } from '../services/experimentService'

const ExperimentContext = createContext()

const experimentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload }
      
    case 'START_TRIAL':
      console.log('START_TRIAL reducer called with payload:', action.payload)
      const newState = {
        ...state,
        currentDigit: action.payload.currentDigit,
        sequence: action.payload.sequence,
        sessionId: action.payload.sessionId,
        trials: action.payload.trials,
        currentTrial: state.responses.length > 0 ? state.currentTrial + 1 : 0,
        responses: [] // Reset responses for new trial
      }
      console.log('New state after START_TRIAL:', newState)
      return newState

    case 'RECORD_RESPONSE':
      const nextIndex = state.responses.length + 1
      const nextDigit = state.sequence[nextIndex]
      
      // If we've reached the end of the sequence
      if (!nextDigit) {
        return {
          ...state,
          responses: [...state.responses, action.payload],
          savedTrials: [...state.savedTrials, {
            sequence: state.sequence,
            responses: [...state.responses, action.payload]
          }]
        }
      }

      // Otherwise continue with current trial
      return {
        ...state,
        responses: [...state.responses, action.payload],
        currentDigit: nextDigit
      }

    case 'SET_TRIAL_DATA':
      return {
        ...state,
        trialData: action.payload,
        currentDigit: action.payload.digit
      }

    case 'UPDATE_TRIAL_METRICS':
      return {
        ...state,
        performanceMetrics: [...state.performanceMetrics, {
          trial: state.currentTrial,
          ...action.payload
        }]
      }

    case 'COMPLETE_EXPERIMENT':
      return { ...state, isComplete: true }

    case 'SAVE_TRIAL_START':
      return { ...state, isSaving: true }

    case 'SAVE_TRIAL_SUCCESS':
      return {
        ...state,
        isSaving: false,
        savedTrials: [...state.savedTrials, action.payload]
      }

    case 'SAVE_TRIAL_ERROR':
      return {
        ...state,
        isSaving: false,
        error: action.payload
      }

    default:
      return state
  }
}

export const ExperimentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(experimentReducer, {
    sessionId: null,
    trials: [],
    currentTrial: 0,
    currentDigit: null,
    responses: [],
    performanceMetrics: [],
    trialData: null,
    isComplete: false,
    isSaving: false,
    savedTrials: [],
    error: null
  })

  const saveTrialData = async (trialData) => {
    dispatch({ type: 'SAVE_TRIAL_START' })
    try {
      const response = await fetch(`/api/data/trials/${state.sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trialData)
      })
      const savedTrial = await response.json()
      dispatch({ type: 'SAVE_TRIAL_SUCCESS', payload: savedTrial })
      return savedTrial
    } catch (error) {
      dispatch({ type: 'SAVE_TRIAL_ERROR', payload: error.message })
      throw error
    }
  }

  const value = {
    state,
    dispatch,
    saveTrialData
  }

  return (
    <ExperimentContext.Provider value={value}>
      {children}
    </ExperimentContext.Provider>
  )
}

export const useExperiment = () => {
  const context = useContext(ExperimentContext)
  if (!context) {
    throw new Error('useExperiment must be used within an ExperimentProvider')
  }
  return context
}