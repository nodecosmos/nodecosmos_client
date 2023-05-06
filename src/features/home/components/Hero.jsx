import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export default function Hero({ inView, heroLogoRef }) {
  return (
    <Box py={{
      xs: 8,
      sm: 12,
      md: 14,
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
          width={85}
          height={85}
          ref={heroLogoRef}
          style={{
            animation: inView && 'rotate 0.3s',
            visibility: inView ? 'visible' : 'hidden',
          }}
        />
        <Box ml={{
          xs: 2,
          md: 2,
        }}
        >
          <Typography
            variant="h1"
            fontWeight="900"
            fontSize={{
              '@media (max-width: 360px)': {
                fontSize: 25,
              },
              xs: 30,
              sm: 40,
              md: 50,
            }}
            color="text.contrast"
            fontFamily="'Montserrat', sans-serif"
          >
            Innovation Collaboration Platform
          </Typography>
          <Box display={{ md: 'block', xs: 'none' }}>
            <Typography
              variant="h2"
              fontFamily="'Montserrat', sans-serif"
              fontSize={{
                sm: 18.4,
              }}
              fontWeight={400}
              textAlign="left"
              lineHeight={1.5}
              mt={0.5}
            >
              💡 Share Your Innovation
              👩‍💻 Engage with Communities
              🔧 Get Contributions
              ✨ And much more...
            </Typography>
          </Box>
          <Box display={{ md: 'none', xs: 'block' }}>
            <Typography
              variant="h2"
              fontFamily="'Montserrat', sans-serif"
              fontSize={{
                '@media (max-width: 360px)': {
                  fontSize: 13,
                },
                xs: 18,
                sm: 22,
              }}
              fontWeight={400}
              textAlign="left"
              lineHeight={1.5}
              mt={{
                xs: 1,
                md: 1,
              }}
            >
              Share your Innovation,
              engage with Communities,
              get Contributions,
              and much more...
            </Typography>
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
