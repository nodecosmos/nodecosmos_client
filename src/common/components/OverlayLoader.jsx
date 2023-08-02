import React from 'react';
import { Box } from '@mui/material';
import Loader from './Loader';

export default function OverlayLoader() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width={1}
      height={1}
      sx={{
        backgroundColor: 'background.backdrop',
        opacity: 1,
        zIndex: 2,
      }}
    >
      <Loader color="secondary.main" />
    </Box>
  );
}
