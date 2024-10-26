import { useEffect, useState } from 'react'
import { useExperiment } from '../../context/ExperimentContext'

const NST = () => {
  const [currentDigit, setCurrentDigit] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const { state, dispatch } = useExperiment()

  const startExperiment = async () => {
    const response = await fetch('/api/experiment/start', {
      method: 'POST'
    })
    const data = await response.json()
    setSessionId(data.sessionId)
  }

  const fetchNextDigit = async () => {
    const response = await fetch(`/api/experiment/${sessionId}/next`)
    const digit = await response.json()
    setCurrentDigit(digit)
  }

  useEffect(() => {
    startExperiment()
  }, [])

  useEffect(() => {
    if (sessionId) {
      fetchNextDigit()
    }
  }, [sessionId])

  useEffect(() => {
    const handleKeyPress = async (e) => {
      if (e.key === 'f' || e.key === 'j') {
        const response = await fetch(`/api/${sessionId}/response`, {
          method: 'POST',
          body: JSON.stringify({ response: e.key }),
          headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
          fetchNextDigit()
        }
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [sessionId])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ fontSize: '72px', fontFamily: 'monospace' }}>
        {currentDigit || ''}
      </div>
    </div>
  )
}

export default NST