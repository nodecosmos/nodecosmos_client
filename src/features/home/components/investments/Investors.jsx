import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../app/components/GradientText';

export default function Investors() {
  return (
    <>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="900"
        textAlign="center"
      >
        For Investors
      </Typography>
      <Box
        my={4}
        mx={1}
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          '& li:not(:first-of-type)': {
            mt: 4,
            borderRadius: 3,
          },
        }}
      >
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="earth.svg" width={40} />
            <Box ml={3}>
              <GradientText gradientVariant="green" text="Explore innovations" />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
              >
                Discover innovations that match your interests
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="shield.svg" width={40} />
            <Box ml={3}>
              <GradientText gradientVariant="green" text="Fraud Prevention" />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}

              >
                Make data-driven calls based on innovation activities, contributions and community feedback
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="boxes.svg" width={40} />
            <Box ml={3}>
              <GradientText gradientVariant="green" text="Token ownership" />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
              >
                Buy innovation tokens and get a share of the profits
              </Typography>
            </Box>
          </Box>
        </li>
      </Box>
    </>
  );
}
