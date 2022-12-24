import { useEffect } from 'react';
import * as React from 'react';
import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AnimateOnView from './AnimateOnView';
import MvpStepIcon from './mvp/MvpStepIcon';

const steps = [
  'Design Product',
  'Node Tree',
  'Markdown',
  'Workflow',
  'Media',
  'Contribution Request',
  'Crypto Integration',
];

const XS_SCROLL_WIDTH = 800;

export default function Mvp() {
  const scrollable = React.useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (scrollable.current) {
      // scroll to center
      scrollable.current.scrollLeft = (XS_SCROLL_WIDTH - scrollable.current.clientWidth) / 2;
    }
  }, []);

  return (
    <Box
      sx={{ width: '100%' }}
      mt={{
        xs: 16,
        md: 32,
      }}
    >
      <AnimateOnView>
        <Typography
          variant="h4"
          textAlign="center"
          fontSize={{
            xs: '28px',
            sm: '32px',
          }}
        >
          Current
          <Box component="span" color="sectionPrimary" fontWeight="bold">
            {' '}
            Feature Progress
            {' '}
          </Box>
          of the MVP
        </Typography>
      </AnimateOnView>
      <AnimateOnView delay={200}>
        <Box ref={scrollable} mt={3} overflow="auto" pb={{ xs: 1, md: 0 }}>
          <Box width={{
            xs: XS_SCROLL_WIDTH,
            md: '100%',
          }}
          >
            <Stepper
              activeStep={3}
              alternativeLabel
              sx={{
                '.Mui-completed': {
                  '.MuiStepConnector-line': {
                    borderColor: theme.palette.sectionPrimary,
                    borderWidth: 2,
                  },
                },
                '.MuiStepLabel-label': {
                  fontFamily: "'Montserrat',sans-serif",
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={MvpStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </AnimateOnView>
    </Box>
  );
}
