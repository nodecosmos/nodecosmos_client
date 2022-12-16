import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Workflow from '../landing-page-workflow/Workflow';

export default function LandingPageWorkflow() {
  return (
    <Box>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        sx={{
          background: {
            xs: 'linear-gradient(35deg, #e366ff 0%, #ff366c 45%)',
            sm: 'linear-gradient(35deg, #e366ff 0%, #ff366c 20%)',
          },
          WebkitBackgroundClip: 'text!important',
          backgroundClip: 'text!important',
          WebkitTextFillColor: 'transparent!important',
          WebkitBoxDecorationBreak: 'clone',
          color: '#fff',
          lineHeight: {
            xs: 1.334,
            sm: 1,
          },
        }}
      >
        Define your workflow
      </Typography>
      <Typography mt={3} variant="body1" color="#fff">
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
          zIndex={2}
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
            color="#656e76"
            pb="4px"
            mx={{
              // as defined in src/features/home/components/Section.jsx:28
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
