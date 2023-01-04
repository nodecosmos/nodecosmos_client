import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../app/components/GradientText';
import Workflow from '../landing-page-workflow/Workflow';

export default function LandingPageWorkflow() {
  return (
    <Box>
      <GradientText text="Define processes" />
      <Typography mt={3} variant="body1" color="text.secondary">
        Use Workflow feature to describe how your innovation works or other processes related to your innovation.
      </Typography>
      <Box
        mx={{
          // as defined in src/features/home/components/Section.jsx:28
          xs: -3,
          sm: -4,
        }}
        mt={3}
      >
        <Box
          sx={{
            borderBottom: '1px solid',
            borderColor: {
              xs: '#202027',
              md: '#101013',
            },
            boxShadow: {
              xs: '0px 3px 1px -2px rgb(68 66 72 / 20%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
              md: '0px 3px 1px -2px rgb(66 70 72 / 50%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
            },
          }}
        >
          <Typography
            variant="body2"
            color="text.tertiary"
            pb="4px"
            mx={{
              xs: 3,
              sm: 4,
            }}
            textAlign={{
              xs: 'center',
              md: 'left',
            }}
            fontSize={{
              xs: 12,
              sm: 14,
            }}
          >
            Sample
            <b> Workflow </b>
            describing Airplane flight process.
          </Typography>
        </Box>
        <Box>
          <Workflow />
        </Box>
      </Box>
    </Box>
  );
}
