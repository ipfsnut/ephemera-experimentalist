import React, { createContext, useContext, useReducer } from 'react'

const ExperimentContext = createContext()

const experimentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload }
    case 'RECORD_RESPONSE':
      return {
        ...state,
        responses: [...state.responses, {
          ...action.payload,
          trialNumber: state.currentTrial,
          timestamp: Date.now()
        }]
      }
    case 'SET_TRIAL_DATA':
      return {
        ...state,
        trialData: action.payload,
        currentTrial: state.currentTrial + 1
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
      return {
        ...state,
        isComplete: true
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
    responses: [],
    performanceMetrics: [],
    trialData: null,
    isComplete: false
  })

  return (
    <ExperimentContext.Provider value={{ state, dispatch }}>
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
