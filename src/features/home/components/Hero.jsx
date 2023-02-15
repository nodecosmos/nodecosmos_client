import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export default function Hero({ inView, heroLogoRef }) {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={{
          xs: 8,
          sm: 12,
          md: 14,
        }}
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
          <Typography
            variant="h2"
            fontFamily="'Montserrat', sans-serif"
            fontSize={{
              '@media (max-width: 360px)': {
                fontSize: 13,
              },
              xs: 18,
              sm: 22.7,
            }}
            fontWeight={400}
            textAlign="left"
            lineHeight={1.5}
            mt={{
              xs: 1,
              md: 0,
            }}
          >
            Where scientists, engineers, and entrepreneurs collaborate to build innovations.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

Hero.propTypes = {
  inView: PropTypes.bool.isRequired,
  heroLogoRef: PropTypes.object.isRequired,
};
