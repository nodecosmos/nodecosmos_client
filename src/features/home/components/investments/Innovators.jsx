import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../app/components/common/GradientText';

export default function Innovators() {
  return (
    <>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        textAlign="center"
        fontWeight="900"
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
            <Box component="img" src="eth.svg" width={40} />

            <Box ml={3}>
              <GradientText gradientVariant={3} text="ICO" />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
                color="text.secondary"
              >
                Issue
                {' '}
                <Box
                  component="a"
                  href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/"
                  target="_blank"
                  color="secondary.main"
                  cursor="pointer"
                  borderBottom="2px solid"
                  borderBottomColor="secondary.main"
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
            <Box component="img" src="attrack_investors.svg" width={40} />
            <Box ml={3}>
              <GradientText gradientVariant={3} text="Attract Investors" />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
                color="text.secondary"
              >
                Issue secure smart contracts to attract investors and use transparency as your weapon
              </Typography>
            </Box>
          </Box>
        </li>
        <li>
          <Box display="flex" alignItems="center">
            <Box component="img" src="rocket.svg" width={40} />
            <Box ml={3}>
              <GradientText gradientVariant={3} text="Supercharge your innovation" />
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
                mt={0.5}
                color="text.secondary"
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
