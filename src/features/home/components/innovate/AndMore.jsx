import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Other() {
  const coolRef = React.useRef(null);

  const glassesOff = '( •_•)>⌐■-■';
  const glassesOffWink = '( - _•)>⌐■-■';
  const glassesOn = '(⌐■_■)';

  const [currentEmoji, setCurrentEmoji] = React.useState(glassesOn);
  const [sequenceCounter, setsequenceCounter] = React.useState(0);

  useEffect(() => {
    const sequence = [glassesOn, glassesOff, glassesOffWink, glassesOff, glassesOn];

    if (sequenceCounter < 10) {
      setTimeout(() => {
        setCurrentEmoji(sequence[sequenceCounter % 5]);
        setsequenceCounter(sequenceCounter + 1);
      }, 1000);
    }
  }, [sequenceCounter, currentEmoji]);

  return (
    <Box>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        sx={{
          background: {
            xs: 'linear-gradient(35deg, #06e1ff 0%, #ce6cff 50%)',
            sm: 'linear-gradient(35deg, #06e1ff 0%, #ce6cff 25%)',
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
        Stay tuned!
      </Typography>
      <Typography mt={3} variant="body1" color="#fff">
        As part of our efforts to make your innovation journey even more fun, we plan to add features such as a
        leaderboard, gallery, 2D drawing, and in-node chat
      </Typography>

      <Box>
        <Typography
          my={3}
          ref={coolRef}
          color="#fff"
          fontSize={{
            xs: 50,
            sm: 100,
          }}
          textAlign="center"
        >
          {currentEmoji}
        </Typography>
      </Box>
    </Box>
  );
}
