import Check from '@mui/icons-material/Check';
import { styled, Typography } from '@mui/material';
import { useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import AnimateOnView from './AnimateOnView';

const steps = [
  'Design Product',
  'Node Tree',
  'Markdown',
  'Workflow',
  'Media',
  'Contribution Request',
  'Crypto Integration',
];

function QontoStepIcon(props) {
  // eslint-disable-next-line react/prop-types
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const QontoStepIconRoot = styled('div')(({ ownerState }) => ({
  color: '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#b8fb8a',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#b8fb8a',
    zIndex: 1,
    fontSize: 24,
  },
  '& .QontoStepIcon-circle': {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

export default function MVP() {
  const scrollable = React.useRef(null);

  useEffect(() => {
    if (scrollable.current) {
      scrollable.current.scrollLeft = 200;
    }
  }, []);

  return (
    <Box
      sx={{ width: '100%' }}
      mt={{
        xs: 5,
        md: 7,
      }}
    >
      <AnimateOnView threshold={1}>
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
          <Box component="span" color="#b6fd7b" fontWeight="bold">
            {' '}
            Feature Progress
            {' '}
          </Box>
          for the MVP
        </Typography>
      </AnimateOnView>
      <AnimateOnView threshold={1} delay={200}>
        <Box ref={scrollable} mt={5} overflow="auto" pb={{ xs: 2, md: 0 }}>
          <Box width={{
            xs: 800,
            md: '100%',
          }}
          >
            <Stepper
              activeStep={3}
              alternativeLabel
              sx={{
                '.Mui-completed': {
                  color: '#b8fb8a',
                  '.MuiStepConnector-line': {
                    borderColor: '#b8fb8a',
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
                  <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </AnimateOnView>
    </Box>
  );
}
