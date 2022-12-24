import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Investors() {
  return (
    <>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        textAlign="center"
        fontWeight="900"
        fontSize="1.8rem"
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
            <Box component="img" src="earth.svg" width={47} />
            <Box ml={3}>
              <Typography variant="h5" color="sectionPrimary" fontFamily="'Montserrat', sans-serif">
                Explore innovations
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', monospace"
                mt={0.5}
              >
                Discover innovations that match your interests
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="shield.svg" width={47} />
            <Box ml={3}>
              <Typography variant="h5" color="sectionPrimary" fontFamily="'Montserrat', sans-serif">
                Fraud Prevention
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', monospace"
                mt={0.5}

              >
                Make data-driven calls based on innovation activities, contributions and community feedback
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="boxes.svg" width={47} />
            <Box ml={3}>
              <Typography variant="h5" color="sectionPrimary" fontFamily="'Montserrat', sans-serif">
                Token ownership
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', monospace"
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
