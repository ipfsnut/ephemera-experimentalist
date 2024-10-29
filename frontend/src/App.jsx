import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ExperimentProvider } from './context/ExperimentContext'
import Layout from './platform/Layout'
import Home from './components/Home'
import NST from './experiments/NST'
import Results from './experiments/NST/Results'

function App() {
  return (
    <ExperimentProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiments/nst" element={<NST />} />
            <Route path="/experiments/nst/results" element={<Results />} />
          </Routes>
        </Layout>
      </Router>
    </ExperimentProvider>
  )
}

export default App;