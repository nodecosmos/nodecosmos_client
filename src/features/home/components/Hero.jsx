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
        py={10}
      >
        <img
          src="innovate_9.svg"
          alt="logo"
          width={197}
          height={175}
          style={{
            marginLeft: -98.5,
            animation: refInView && 'rotate 0.3s',
          }}
        />
        <Box ml={3}>
          <Typography
            variant="h1"
            fontWeight="900"
            fontSize={{
              '@media (max-width: 360px)': {
                fontSize: 25,
              },
              xs: 30,
              sm: 35,
              md: 44,
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
              xs: 16,
              sm: 20,
            }}
            pl="2px"
            fontWeight={400}
            textAlign="left"
            lineHeight={1.5}
          >
            Where scientists, engineers, and entrepreneurs collaborate to build innovations.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
