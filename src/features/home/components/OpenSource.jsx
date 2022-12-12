import React from 'react';
import { Box, Typography } from '@mui/material';
import AnimateOnView from './AnimateOnView';
import OpenSourceLink1 from './open-source/OpenSourceLink1';
import OpenSourceLink2 from './open-source/OpenSourceLink2';
import OpenSourceLink3 from './open-source/OpenSourceLink3';
import OpenSourceLink4 from './open-source/OpenSourceLink4';
import OpenSourceLink5 from './open-source/OpenSourceLink5';

export default function OpenSource() {
  return (
    <Box mt={{
      xs: 8,
      md: 32,
    }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <AnimateOnView>
          <Typography
            variant="h4"
            textAlign="center"
            lineHeight={{
              xs: 1.3,
              sm: 1,
            }}
            fontSize={{
              xs: '28px',
              sm: '32px',
            }}
          >
            Explore possibilities with
            <Box component="span" color="#cdd4ff" fontWeight="bold">
              {' '}
              Open Collaboration
              {' '}
            </Box>
          </Typography>
        </AnimateOnView>
      </Box>
      <Box sx={{
        transform: {
          xs: 'scale(1.2) translateX(-10px)',
          sm: 'scale(1)',
        },
        my: {
          xs: 10,
          sm: 0,
        },
      }}
      >
        <OpenSourceLink1 />
        <OpenSourceLink2 />
        <OpenSourceLink3 />
        <OpenSourceLink4 />
        <OpenSourceLink5 />
      </Box>
    </Box>
  );
}
