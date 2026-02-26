import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { generatePlaceholder } from '../../../../utils/formatter'
import { cloneDeep } from 'lodash'
import { createNewColumnAPI } from '../../../../apis'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard
} from '../../../../redux/activeBoard/activeBoardSlice'

function ListColumns({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  // const [searchValue, setSearchValue] = useState(null)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('please enter column title')
      return
    }

    //tạo dữ liệu để gọi api tạo column
    const newColumnData = {
      title: newColumnTitle
    }

    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board?._id
    })

    //xử lý kéo thả card khi tạo column mới rỗng
    createdColumn.cards = [generatePlaceholder(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholder(createdColumn)._id]
    //dùng clonedeep vì vấn đề Immutability của redux, hàm push làm thay đổi giá trị mảng nên ko dùng spread operator(shallow copy) để copy đc
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    dispatch(updateCurrentActiveBoard(newBoard))

    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': { m: 2 }
        }}
      >
        {columns?.map((column) => {
          return <Column key={column._id} column={column} />
        })}
        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxHeight: '250px',
              mx: 2,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d'
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{ color: 'white', width: '100%' }}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: '#ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}
          >
            <TextField
              sx={{
                minWidth: '120px',
                maxWidth: '250px',
                '& label': { color: 'white' },

                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
              label='Enter column title'
              type='text'
              size='small'
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                className='interceptor-loading'
                onClick={addNewColumn}
                variant='contained'
                size='small'
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  color: 'success.contrastText',
                  bgcolor: 'success.light'
                }}
              >
                Add column
              </Button>
              <CloseIcon
                fontSize='small'
                sx={{
                  color: 'warning.contrastText',
                  cursor: 'pointer',
                  '&:hover': { color: 'warning.main' }
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
