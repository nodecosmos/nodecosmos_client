import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';

const INNOVATION = 'INNOVATION';
const INVESTMENT = 'INVESTMENT';
const COLLABORATION = 'COLLABORATION';

export default function VisionText() {
  const headlines = [INNOVATION, INVESTMENT, COLLABORATION];
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [iteration, setIteration] = useState(0);

  const headlineToShow = headlines[headlineIndex];

  if (iteration < 2) {
    setTimeout(
      () => {
        setHeadlineIndex(headlineIndex === 2 ? 0 : headlineIndex + 1);
        setIteration(iteration + 1);
      },
      1750,
    );
  } else {
    setTimeout(() => setIteration(0), 8000);
  }

  return (
    <Box
      position="absolute"
      zIndex={1}
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Box width="21%" sx={{ textShadow: '0px 0px 1px' }}>
        <Typography variant="h6" fontWeight="bold" fontFamily="Roboto Mono">
          {' '}
          <Typewriter
            style={{ whiteSpace: 'pre-line' }}
            options={{ delay: 45, cursor: null }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2500)
                .typeString('Innovation Collaboration')
                .start();
            }}
          />
        </Typography>
        <Typography variant="h6" fontWeight="bold" fontFamily="Roboto Mono">
          <Typewriter
            style={{ whiteSpace: 'pre-line' }}
            options={{ delay: 45, cursor: null }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(3850)
                .typeString('Platform')
                .start();
            }}
          />
        </Typography>
      </Box>
    </Box>
  );
}
