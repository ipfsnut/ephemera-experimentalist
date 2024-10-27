import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ExperimentProvider } from './context/ExperimentContext'
import Home from './components/Home'
import NST from './experiments/NST'
import Results from './experiments/NST/Results'

function App() {
  return (
    <ExperimentProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiments/nst" element={<NST />} />
          <Route path="/experiments/nst/results" element={<Results />} />
        </Routes>
      </Router>
    </ExperimentProvider>
  )
}

export default App