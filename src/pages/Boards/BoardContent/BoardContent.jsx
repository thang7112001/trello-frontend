import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '../../../utils/sort'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </div>
  )
}

export default BoardContent
