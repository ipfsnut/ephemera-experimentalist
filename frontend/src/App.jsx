import { BrowserRouter as Router } from 'react-router-dom'
import { ExperimentProvider } from './context/ExperimentContext'
import { PlatformProvider } from './context/PlatformContext'
import Layout from './platform/Layout'
import AppRoutes from './routes/AppRoutes'
import NST from './experiments/NST'
import Results from './experiments/NST/Results'

function App() {
  return (
    <PlatformProvider>
      <ExperimentProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </ExperimentProvider>
    </PlatformProvider>
  )
}

export default App;