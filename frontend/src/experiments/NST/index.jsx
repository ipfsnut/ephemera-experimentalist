import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExperiment } from '../../context/ExperimentContext'
import useKeyboardHandler from './Trial/useKeyboardHandler'
import useResponseHandler from './Trial/useResponseHandler'
import useTrialTransition from './Trial/useTrialTransition'
import { useRenderPerformance } from '../../test/performance/hooks'

const NST = () => {
  const [currentDigit, setCurrentDigit] = useState(null)
  const navigate = useNavigate()
  const { state, dispatch } = useExperiment()
  const renderMetrics = useRenderPerformance('NSTExperiment')
  
  const { handleResponse, startTrial, metrics } = useResponseHandler((trialData) => {
    dispatch({ 
      type: 'RECORD_RESPONSE', 
      payload: {
        ...trialData,
        renderCount: renderMetrics.renderCount,
        responseMetrics: metrics
      }
    })
  })
  const { isTransitioning, displayDigit } = useTrialTransition(currentDigit)

  useKeyboardHandler(handleResponse, isTransitioning)

  useEffect(() => {
    if (!isTransitioning && currentDigit) {
      startTrial()
    }
  }, [currentDigit, isTransitioning])

  useEffect(() => {
    if (state.sessionId) {
      fetchNextDigit()
    }
  }, [state.sessionId])

  useEffect(() => {
    if (metrics && !isTransitioning) {
      dispatch({
        type: 'UPDATE_TRIAL_METRICS',
        payload: {
          responseTime: metrics.lastResponse,
          averageRenderTime: renderMetrics.average,
          totalRenders: renderMetrics.renderCount
        }
      })
    }
  }, [metrics, isTransitioning])

  useEffect(() => {
    if (state.isComplete) {
      navigate('/experiment/nst/results', { 
        state: { 
          metrics: state.performanceMetrics,
          responses: state.responses 
        }
      })
    }
  }, [state.isComplete])

  const fetchNextDigit = async () => {
    const response = await fetch(`/api/experiment/${state.sessionId}/next`)
    const data = await response.json()
    setCurrentDigit(data.digit)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ fontSize: '72px', fontFamily: 'monospace' }}>
        {displayDigit || ''}
      </div>
    </div>
  )
}

export default NST