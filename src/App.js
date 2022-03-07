import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/document/:id" element={<Editor />} />
    </Routes>
  )
}

export default App
