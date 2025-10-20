import Button from '@mui/material/Button'
import AccessAlarm from '@mui/icons-material/AccessAlarm'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={ () => {
        setMode(mode === 'light' ? 'dark':'light')
      }}
    >
      {mode === 'light' ? 'turn dark' : 'turn light'}
    </Button>
  )
}
function App() {

  return (
    <>
      <ModeToggle/>
      <hr/>
      <h1>chiến thắng</h1>
      <Typography variant='body2' color='text.secondary'>test 12</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <AccessAlarm></AccessAlarm>
    </>
  )
}

export default App
