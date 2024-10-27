import { useLocation } from 'react-router-dom'
import { useExperiment } from '../../../context/ExperimentContext'

const Results = () => {
  const { state } = useExperiment()
  const location = useLocation()
  const { metrics, responses } = location.state || {}

  const averageResponseTime = metrics?.reduce((acc, m) => acc + m.responseTime, 0) / metrics?.length || 0
  const accuracy = responses?.filter(r => r.isCorrect).length / responses?.length * 100 || 0

  return (
    <div className="results-container">
      <h2>Number Switching Task Results</h2>
      
      <div className="summary-stats">
        <h3>Performance Summary</h3>
        <div>Average Response Time: {averageResponseTime.toFixed(2)}ms</div>
        <div>Accuracy: {accuracy.toFixed(1)}%</div>
      </div>

      <div className="trial-results">
        <h3>Trial Details</h3>
        {responses?.map((response, index) => (
          <div key={index} className="trial-row">
            <span>Trial {index + 1}</span>
            <span>Response Time: {response.responseTime}ms</span>
            <span>Correct: {response.isCorrect ? '✓' : '✗'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Results