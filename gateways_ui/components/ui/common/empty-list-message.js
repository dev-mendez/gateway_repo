import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function EmptyListMessage() {
  return (
    <Box>
      <Typography
        variant="h3"
        noWrap
        sx={{
          mr: 2,
          mt: 5,
          flexGrow: 0,
          fontFamily: 'monospace',
          fontWeight: 1000,
          letterSpacing: '.1rem',
          color: 'grey',
          opacity: 0.1,
          textDecoration: 'none',
        }}
      >
        The list is empty 🤖
      </Typography>
    </Box>
  );
}
