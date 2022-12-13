import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Other() {
  const coolRef = React.useRef(null);

  const glassesOff = '( •_•)>⌐■-■';
  const glassesOn = '(⌐■_■)';

  let currentEmoji = glassesOn;

  setInterval(() => {
    if (coolRef.current) {
      coolRef.current.innerHTML = currentEmoji;
      currentEmoji = currentEmoji === glassesOff ? glassesOn : glassesOff;
    }
  }, 1500);

  return (
    <Box>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        sx={{
          background: {
            xs: 'linear-gradient(35deg, #b3ff68 0%, #73ffc2 45%)',
            sm: 'linear-gradient(35deg, #b3ff68 0%, #73ffc2 20%)',
          },
          WebkitBackgroundClip: 'text!important',
          backgroundClip: 'text!important',
          WebkitTextFillColor: 'transparent!important',
          WebkitBoxDecorationBreak: 'clone',
          color: '#fff',
          lineHeight: 1,
        }}
      >
        Stay tuned!
      </Typography>
      <Typography mt={3} variant="body1" color="#fdfff9">
        To make your innovation journey even more fun, we plan to have a few more
        features like a leaderboard, gallery, 2D drawing, and more.
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
          ( •_•)&gt;⌐■-■
        </Typography>
      </Box>
    </Box>
  );
}
