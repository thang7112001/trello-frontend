//board detail
import Container from '@mui/material/Container'
import AppBar from '../../components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '../../apis/mock-data'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchBoardDetailsAPI,
  createNewCardAPI,
  createNewColumnAPI,
  updateBoardDetailsAPI
} from '../../apis'
import { generatePlaceholder } from '../../utils/formatter'
import { isEmpty } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const loadBoard = async () => {
      if (!id) return
      try {
        const data = await fetchBoardDetailsAPI(id)

        //xử lý kéo thả card khi column rỗng
        const newBoard = { ...data }
        newBoard.columns.forEach((column) => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholder(column)]
            column.cardOrderIds = [generatePlaceholder(column)._id]
          }
        })

        setBoard(newBoard)
      } catch (err) {
        console.error('Failed to fetch board', err)
      }
    }

    loadBoard()
  }, [id])
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board?._id
    })

    //xử lý kéo thả card khi tạo column mới rỗng
    createdColumn.cards = [generatePlaceholder(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholder(createdColumn)._id]

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board?._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(
      (columns) => columns._id === createdCard.columnId
    )
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  //gọi api kkhi kéo thả column xong
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds
    })
  }

  console.log('data', board)
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
