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
        py={{
          xs: 8,
          sm: 12,
          md: 14,
        }}
      >
        <img
          src="logo_1.svg"
          alt="logo"
          width={100}
          style={{
            animation: refInView && 'rotate 0.3s',
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
