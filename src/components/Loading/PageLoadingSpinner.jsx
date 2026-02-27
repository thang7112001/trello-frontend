import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function PageLoadingSpinner({ caption }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        width: '100vw',
        height: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Box
        sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', height: '40px' }}
      >
        {[1, 2, 3].map((item) => (
          <Box
            key={item}
            sx={{
              width: '12px',
              bgcolor: 'secondary.main',
              borderRadius: '4px',
              animation: 'bounce 1s infinite ease-in-out',
              animationDelay: `${item * 0.15}s`,
              '@keyframes bounce': {
                '0%, 100%': { height: '16px' },
                '50%': { height: '40px' }
              }
            }}
          />
        ))}
      </Box>

      <Typography
        variant='h6'
        color='text.secondary'
        sx={{
          fontWeight: 500,
          letterSpacing: '2px',
          animation: 'pulse 1.5s infinite ease-in-out',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.6 },
            '50%': { opacity: 1 }
          }
        }}
      >
        {caption || 'Loading...'}
      </Typography>
    </Box>
  )
}

export default PageLoadingSpinner
