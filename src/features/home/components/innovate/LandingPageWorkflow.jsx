import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Workflow from '../landing-page-workflow/Workflow';

export default function LandingPageWorkflow() {
  return (
    <Box>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="bold"
        sx={{
          background: {
            xs: 'linear-gradient(35deg, #81ff36 0%, #22ffdb 40%)',
            sm: 'linear-gradient(35deg, #81ff36 0%, #22ffdb 20%)',
          },
          WebkitBackgroundClip: 'text!important',
          backgroundClip: 'text!important',
          WebkitTextFillColor: 'transparent!important',
          WebkitBoxDecorationBreak: 'clone',
          color: '#fff',
          lineHeight: 1,
        }}
      >
        Define your workflow
      </Typography>
      <Typography mt={3} variant="body1" color="#fdfff9">
        Use Workflow feature to describe how your innovation works or other processes related to your innovation.
      </Typography>
      <Box mt={3}>
        <Workflow />
      </Box>
    </Box>
  );
}
