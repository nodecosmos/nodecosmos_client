import {
  Grid,
  Step, StepLabel, Stepper, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import AnimateOnView from './AnimateOnView';
import Section from './Section';

export default function Roadmap() {
  const steps = [
    'Design product',
    'Authentication',
    'Node Tree',
    'Node Markdown Editor',
    'Workflow',
    'Crypto Investments Features',
  ];

  return (
    <Box mt={{
      md: 7,
      xs: 5,
    }}
    >
      <AnimateOnView threshold={0.9}>
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
          Track our
          <Box component="span" color="#d09dff" fontWeight="bold">
            {' '}
            MVP Progress
            {' '}
          </Box>
        </Typography>
      </AnimateOnView>

      <Grid container mt={5} spacing={0} justifyContent="center">
        <Grid item xs={2}>
          <AnimateOnView threshold={0.9}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <DoneRoundedIcon htmlColor="#b3ff68" sx={{ fontSize: 50 }} />
              <Typography textAlign="center" mt={2}>
                Design Product
              </Typography>
            </Box>
          </AnimateOnView>
        </Grid>
        <Grid item xs={1}>
          <AnimateOnView threshold={0.9}>
            <Box height="100%" display="flex" alignItems="center" justifyContent="center">
              <HorizontalRuleRoundedIcon htmlColor="#b3ff68" sx={{ fontSize: 50 }} />
            </Box>
          </AnimateOnView>
        </Grid>
        <Grid item xs={2}>
          <AnimateOnView threshold={0.9}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <DoneRoundedIcon htmlColor="#b3ff68" sx={{ fontSize: 50 }} />
              <Typography textAlign="center" mt={2}>
                Design Product
              </Typography>
            </Box>
          </AnimateOnView>
        </Grid>
        <Grid item xs={1}>
          <AnimateOnView threshold={0.9}>
            <Box height="100%" display="flex" alignItems="center" justifyContent="center">
              <HorizontalRuleRoundedIcon htmlColor="#b3ff68" sx={{ fontSize: 50 }} />
            </Box>
          </AnimateOnView>
        </Grid>
        <Grid item xs={2}>
          <AnimateOnView threshold={0.9}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <DoneRoundedIcon htmlColor="#b3ff68" sx={{ fontSize: 50 }} />
              <Typography textAlign="center" mt={2}>
                Design Product
              </Typography>
            </Box>
          </AnimateOnView>
        </Grid>
      </Grid>
    </Box>
  );
}
