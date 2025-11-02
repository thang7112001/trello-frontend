import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <div>
      <Box sx={{ width:'100%', height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`, display: 'flex', alignItems: 'center', backgroundColor: '' }}>
        Board Content
      </Box>
    </div>
  )
}

export default BoardContent