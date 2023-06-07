import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export default function Hero({ inView, heroLogoRef }) {
  return (
    <Box py={{
      xs: 8,
      sm: 12,
      md: 18,
    }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          src="logo_1.svg"
          alt="logo"
          width={{
            xs: 100,
            sm: 110,
          }}
          height={{
            xs: 100,
            sm: 110,
          }}
          ref={heroLogoRef}
          style={{
            animation: inView && 'rotate 0.3s',
            visibility: inView ? 'visible' : 'hidden',
          }}
          sx={{
            display: {
              '@media (max-width: 360px)': {
                display: 'none',
              },
              xs: 'block',
            },
          }}
        />
        <Box ml={2}>
          <Typography
            variant="h1"
            fontSize={{
              '@media (max-width: 320px)': {
                fontSize: 25,
              },
              xs: 33,
              sm: 40,
              md: 55,
            }}
            color="text.contrast"
            fontFamily="'Cherry Bomb One', sans-serif"
          >
            Innovation Collaboration Platform
          </Typography>
          <Box display={{ md: 'block', xs: 'none' }}>
            <Typography
              variant="h6"
              fontFamily="'Comfortaa', sans-serif"
              color="text.tertiary"
              fontSize={{
                sm: 17,
              }}
              fontWeight={700}
              textAlign="left"
              lineHeight={1.5}
              mt={0.5}
              ml="-2px"
            >
              💡 Share Your Innovation
              👩‍💻 Engage with Communities
              🔧 Get Contributions
              ✨ And much more...
            </Typography>
          </Box>
          <Box
            display={{ md: 'none', xs: 'block' }}
            component="ul"
            variant="h6"
            fontFamily="'Comfortaa', sans-serif"
            fontSize={16}
            fontWeight={700}
            textAlign="left"
            lineHeight={1.5}
            mt={1.5}
            color="text.tertiary"
            sx={{
              listStyle: 'none',
              '& li': {
                mb: 0.5,
              },
            }}
          >
            <li>
              💡 Share Your Innovation
            </li>
            <li>
              👩‍💻 Connect Communities
            </li>
            <li>
              🔧 Get Contributions
            </li>
            <li>
              ✨ And much more...
            </li>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Hero.propTypes = {
  inView: PropTypes.bool.isRequired,
  heroLogoRef: PropTypes.object.isRequired,
};
