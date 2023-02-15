import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../../common/components/GradientText';
import Workflow from '../../../home-workflow/LandingPageWorkflow';

export default function LandingPageWorkflow() {
  return (
    <Box>
      <GradientText text="Define processes" variant="h5" variantMapping={{ h5: 'h3' }} />
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
          borderBottom={1}
          borderColor={{
            xs: 'borders.box.xs',
            md: 'borders.box.md',
          }}
          boxShadow={{
            xs: 'boxBorder.bottom.xs',
            md: 'boxBorder.bottom.md',
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
