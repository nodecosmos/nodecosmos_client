import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Innovators() {
  return (
    <>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        textAlign="center"
        fontWeight="900"
        fontSize="1.8rem"
      >
        For Innovators
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
            <Box component="img" src="eth.svg" width={47} />

            <Box ml={3}>
              <Typography variant="h5" color="sectionPrimary" fontFamily="'Montserrat', sans-serif">
                ICO
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', monospace"
                mt={0.5}
              >
                Issue
                {' '}
                <Box
                  component="a"
                  href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/"
                  target="_blank"
                  color="#cdd4ff"
                  sx={{
                    cursor: 'pointer',
                    borderBottom: '3px solid #cdd4ff',
                    lineHeight: 2,
                  }}
                  onClick={() => {
                    window.open('https://ethereum.org/en/developers/docs/standards/tokens/erc-20/', '_blank');
                  }}
                >
                  ERC-20
                </Box>
                {' '}
                tokens as shares of your innovation
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="attrack_investors.svg" width={47} />
            <Box ml={3}>
              <Typography variant="h5" color="sectionPrimary" fontFamily="'Montserrat', sans-serif">
                Attract Investors
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', monospace"
                mt={0.5}
              >
                Issue secure smart contracts to attract investors and use transparency as your weapon
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="rocket.svg" width={47} />
            <Box ml={3}>
              <Typography variant="h5" color="sectionPrimary" fontFamily="'Montserrat', sans-serif">
                Supercharge your innovation
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', monospace"
                mt={0.5}
              >
                Use the power of blockchain to launch your innovation
              </Typography>
            </Box>
          </Box>
        </li>
      </Box>
    </>

  );
}
