//board detail
import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '../../apis/mock-data'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBoardDetailsAPI } from '../../apis'

function Board() {
  const [board, setBoard] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const loadBoard = async () => {
      if (!id) return
      try {
        const data = await fetchBoardDetailsAPI(id)
        setBoard(data)
        console.log('data', data)
      } catch (err) {
        console.error('Failed to fetch board', err)
      }
    }

    loadBoard()
  }, [id])
  console.log('data', board)
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
