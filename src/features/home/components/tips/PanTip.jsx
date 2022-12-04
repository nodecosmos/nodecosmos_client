import React from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

export default function PanTip() {
  const theme = useTheme();
  const matchesLaptop = useMediaQuery(theme.breakpoints.up('lg'));
  if (!matchesLaptop) return null;

  const isMac = navigator.userAgent.includes('Mac OS X');

  return (
    <Box textAlign="right" mt={3}>
      <Typography
        variant="body1"
        sx={{
          color: '#656e76',
        }}
      >
        <b>💡 Quick tip: </b>
        Use
        {
            isMac ? ' ⌘ ' : ' Ctrl '
        }
        + Left Click to pan
      </Typography>
    </Box>
  );
}
