import NST from './experiments/NST'
import { ExperimentProvider } from './context/ExperimentContext'

function App() {
  return (
    <ExperimentProvider>
      <NST />
    </ExperimentProvider>
  )
}

export default App
