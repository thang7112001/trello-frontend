import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Board from './pages/Boards/_id'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Board />} />
        <Route path='/:id' element={<Board />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
