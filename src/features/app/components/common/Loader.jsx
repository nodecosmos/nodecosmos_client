import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <Box height={1} display="flex" alignItems="center" justifyContent="center">
      <CircularProgress
        size={100}
        sx={{
          color: 'background.4',
        }}
      />
    </Box>
  );
}
