import { createContext, useContext, useReducer } from 'react'

const ExperimentContext = createContext()

const initialState = {
  currentTrial: 0,
  responses: []
}

function experimentReducer(state, action) {
  switch (action.type) {
    case 'RECORD_RESPONSE':
      return {
        ...state,
        responses: [...state.responses, action.payload]
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
