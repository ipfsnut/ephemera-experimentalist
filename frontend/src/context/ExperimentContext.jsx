import { createContext, useContext, useReducer } from 'react'

// Create context for experiment state management
const ExperimentContext = createContext()

// Initial state includes session tracking and performance metrics
const initialState = {
  currentTrial: 0,
  responses: [],
  sessionId: null,
  performanceMetrics: [],
  trialData: null,
  isComplete: false
}

function experimentReducer(state, action) {
  switch (action.type) {
    // Record user response with timing and accuracy
    case 'RECORD_RESPONSE':
      return {
        ...state,
        responses: [...state.responses, {
          ...action.payload,
          trialNumber: state.currentTrial,
          timestamp: Date.now()
        }]
      }
    
    // Update trial data with new digit and metadata
    case 'SET_TRIAL_DATA':
      return {
        ...state,
        trialData: action.payload,
        currentTrial: state.currentTrial + 1
      }

    // Store performance metrics for analysis
    case 'UPDATE_TRIAL_METRICS':
      return {
        ...state,
        performanceMetrics: [...state.performanceMetrics, {
          trial: state.currentTrial,
          ...action.payload
        }]
      }

    // Mark experiment as complete and ready for data export
    case 'COMPLETE_EXPERIMENT':
      return {
        ...state,
        isComplete: true
      }

    default:
      return state
  }
}

export function ExperimentProvider({ children }) {
  const [state, dispatch] = useReducer(experimentReducer, initialState)
  return (
    <ExperimentContext.Provider value={{ state, dispatch }}>
      {children}
    </ExperimentContext.Provider>
  )
}

export function useExperiment() {
  return useContext(ExperimentContext)
}
