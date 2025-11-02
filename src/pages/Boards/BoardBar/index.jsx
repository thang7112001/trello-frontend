import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <div>
      <Box sx={{ width:'100%', height: (theme) => theme.trello.boardBarHeight, display: 'flex', alignItems: 'center', backgroundColor: 'primary.600' }}>
        Board Bar
      </Box>
    </div>
  )
}

export default BoardBar