import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Box, Typography } from '@mui/material';

export default function Hero() {
  const ref = useRef(null);
  const refInView = useInView(ref);

  return (
    <Box ref={ref}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={8}
        py={{
          xs: 16,
          md: 16,
        }}
      >
        <Box
          component="img"
          src="innovate_9.svg"
          alt="logo"
          ml="-153.015px"
          sx={{
            animation: refInView && 'rotate 0.3s',
          }}
        />
        <Box ml={{
          xs: 2,
          sm: 2,
        }}
        >
          <Typography
            variant="h1"
            fontWeight="900"
            fontSize={{
              xs: 35,
              md: 41.6,
            }}
            fontFamily="'Montserrat', sans-serif"
            color="#fff"
          >
            Innovation Collaboration Platform
          </Typography>
          <Typography
            variant="h2"
            fontFamily="'Roboto Mono', monospace"
            fontSize={{
              xs: 16,
              md: 16,
            }}
            color="#fff"
            fontWeight={400}
            textAlign="left"
          >
            Where scientists, engineers, and entrepreneurs collaborate to build innovations.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
