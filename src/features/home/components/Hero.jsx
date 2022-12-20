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
        px={{
          xs: 0,
          md: 8,
        }}
        py={{
          xs: 10,
          md: 16,
        }}
      >
        <img
          src="innovate_9.svg"
          alt="logo"
          width={227}
          height={202}
          style={{
            marginLeft: -153.015,
            animation: refInView && 'rotate 0.3s',
          }}
        />
        <Box ml={4}>
          <Typography
            variant="h1"
            fontWeight="900"
            fontSize={{
              '@media (max-width: 360px)': {
                fontSize: 25,
              },
              xs: 30,
              sm: 35,
              md: 47,
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
              '@media (max-width: 360px)': {
                fontSize: 13,
              },
              xs: 16,
              sm: 18,
            }}
            pl="2px"
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
