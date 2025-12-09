import Card from './Card/Card'
import Box from '@mui/material/Box'

function ListCard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: '0 5px',
        m: '0 5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${(
            theme
          ) => theme.trello.columnHeaderHeight} - ${(theme) =>
            theme.trello.columnFooterHeight})`
      }}
    >
      <Card />
    </Box>
  )
}

export default ListCard
