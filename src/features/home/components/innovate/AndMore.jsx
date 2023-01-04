import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../app/components/GradientText';

export default function Other() {
  const coolRef = React.useRef(null);

  const glassesOff = '( •_•)>⌐■-■';
  const glassesOffWink = '( - _•)>⌐■-■';
  const glassesOn = '(⌐■_■)';

  const [currentEmoji, setCurrentEmoji] = React.useState(glassesOn);
  const [sequenceCounter, setSequenceCounter] = React.useState(0);

  useEffect(() => {
    const sequence = [glassesOff, glassesOffWink, glassesOff, glassesOn];

    if (sequenceCounter < 8) {
      setTimeout(() => {
        setCurrentEmoji(sequence[sequenceCounter % 4]);
        setSequenceCounter(sequenceCounter + 1);
      }, 1000);
    }
  }, [sequenceCounter, currentEmoji]);

  return (
    <Box>
      <GradientText text="Stay tuned!" gradientVariant={2} />
      <Typography mt={3} variant="body1" color="text.secondary">
        As part of our efforts to make your innovation journey even more fun, we plan to add features such as a
        leaderboard, gallery, 2D drawing, and in-node chat
      </Typography>

      <Box>
        <Typography
          my={3}
          ref={coolRef}
          fontSize={{
            xs: 50,
            sm: 100,
          }}
          textAlign="center"
          color="text.contrast"
        >
          {currentEmoji}
        </Typography>
      </Box>
    </Box>
  );
}
