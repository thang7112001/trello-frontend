import Card from './Card/Card'
import Box from '@mui/material/Box'

function ListCard({ cards }) {
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
          `calc(${theme.trello.boardContentHeight} - 
          ${theme.spacing(5)} - 
          ${theme.trello.columnHeaderHeight} - 
          ${theme.trello.columnFooterHeight})`
      }}
    >
      {cards?.map((card) => {
        return <Card key={card._id} card={card} />
      })}
    </Box>
  )
}

export default ListCard
