import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../../common/components/GradientText';

export default function LandingPageWorkflow() {
  return (
    <Box>
      <GradientText text="Define processes" variant="h5" variantMapping={{ h5: 'h3' }} />
      <Typography mt={3} variant="body1" color="text.secondary">
        Use Workflow feature to describe how your innovation works or other processes related to your innovation.
        Each step is
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
          borderRadius={1}
          sx={{
            overflow: 'hidden',
            width: 1,
            mb: -5,
            ml: {
              xs: 3,
              sm: 4,
            },
            mt: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          <Box
            width={1}
            height={{
              xs: 20,
              sm: 40,
            }}
            backgroundColor="background.6"
            display="flex"
            alignItems="center"
            pl={{
              xs: 3,
              sm: 4,
            }}
            fontSize={{
              xs: 7,
              sm: 14,
            }}
            color="secondary.main"
            fontWeight="bold"
          >
            engine-wf
          </Box>
          <Box component="img" src="/wf-8.webp" width={1} />
        </Box>
      </Box>
    </Box>
  );
}
