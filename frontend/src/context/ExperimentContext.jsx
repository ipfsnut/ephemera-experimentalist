import React, { createContext, useContext, useReducer } from 'react'

const ExperimentContext = createContext()

const experimentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload }
      
    case 'START_TRIAL':
      return {
        ...state,
        currentDigit: action.payload.digit,
        sequence: action.payload.metadata.sequence || [],
        sessionId: action.payload.sessionId,
        trials: Array(10).fill().map(() => ({ 
          number: action.payload.metadata.sequence 
        })),
        currentTrial: state.responses.length > 0 ? state.currentTrial + 1 : 1,
        responses: [],
        currentDigitIndex: 0
      }
    case 'RECORD_RESPONSE':
      const nextIndex = (state.currentDigitIndex || 0) + 1
      const nextDigit = state.sequence?.[nextIndex]
      
      if (!nextDigit) {
        return {
          ...state,
          responses: [...state.responses, action.payload],
          savedTrials: [...(state.savedTrials || []), {
            sequence: state.sequence,
            responses: [...state.responses, action.payload]
          }]
        }
      }

      return {
        ...state,
        responses: [...state.responses, action.payload],
        currentDigit: nextDigit,
        currentDigitIndex: nextIndex
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
    currentDigitIndex: 0,
    sequence: [],
    responses: [],
    performanceMetrics: [],
    trialData: null,
    isComplete: false,
    isSaving: false,
    savedTrials: [],
    error: null
  })

  const value = {
    state,
    dispatch,
    saveTrialData: async (trialData) => {
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

export default ExperimentContext