import { Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

export default function PanTip() {
  const min = useMediaQuery('(min-width: 1023px)');
  if (!min) return null;

  return (
    <Box textAlign="right" mt={3}>
      <Typography
        variant="body1"
        sx={{
          color: '#656e76',
        }}
      >
        <b>💡 Quick tip:</b>
        {' '}
        Use ctrl + left click to pan
      </Typography>
    </Box>
  );
}
