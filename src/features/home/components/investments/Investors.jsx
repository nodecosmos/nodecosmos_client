import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../common/components/GradientText';

export default function Investors() {
  return (
    <>
      <Typography
        variant="h5"
        variantMapping={{ h5: 'h3' }}
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
            <Box component="img" src="earth.svg" alt="Earth icon" width={40} height={40} />
            <Box ml={3}>
              <GradientText gradientVariant={3} text="Explore innovations" variant="h5" variantMapping={{ h5: 'h4' }} />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
                color="text.secondary"
              >
                Discover innovations that match your interests
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="shield.svg" alt="Shield icon" width={40} height={49} />
            <Box ml={3}>
              <GradientText gradientVariant={3} text="Fraud Prevention" variant="h5" variantMapping={{ h5: 'h4' }} />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
                color="text.secondary"

              >
                Make data-driven calls based on innovation activities, contributions and community feedback
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="boxes.svg" alt="Tokens icon" width={40} height={40} />
            <Box ml={3}>
              <GradientText gradientVariant={3} text="Token ownership" variant="h5" variantMapping={{ h5: 'h4' }} />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
                color="text.secondary"
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
