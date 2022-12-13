import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import RocketRoundedIcon from '@mui/icons-material/RocketRounded';

export default function Innovators() {
  return (
    <>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        color="#fff"
        textAlign="center"
        fontWeight="900"
        fontSize="1.8rem"
      >
        For Innovators
      </Typography>
      <Box
        mt={3}
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          '& li': {
            p: 2,
            borderRadius: 3,
            cursor: 'pointer',
            '&:hover': {
              background: '#353a42',
            },
          },
        }}
      >
        <Box component="li">
          <Box display="flex" alignItems="center">
            <TokenRoundedIcon fontSize="large" htmlColor="#b3ff68" />

            <Box ml={2}>
              <Typography
                color="#b3ff68"
                sx={{
                  background: 'linear-gradient(35deg, #81ff36 0%, #22ffdb 45%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitBoxDecorationBreak: 'clone',
                }}
                variant="h5"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="bold"
              >
                {' '}
                ICO
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
              >
                Issue
                {' '}
                <Box
                  component="a"
                  href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/"
                  target="_blank"
                  color="#cdd4ff"
                  fontWeight="bold"
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
        </Box>
        <Box component="li" mt={1}>
          <Box display="flex" alignItems="center">
            <CurrencyExchangeRoundedIcon fontSize="large" htmlColor="#b3ff68" />
            <Box ml={2}>
              <Typography
                sx={{
                  background: 'linear-gradient(35deg, #81ff36 0%, #22ffdb 45%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitBoxDecorationBreak: 'clone',
                }}
                color="#b3ff68"
                variant="h5"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="bold"
              >
                Attract Investors
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
              >
                Issue secure smart contracts to attract investors and use transparency as your weapon
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box component="li" mt={1}>
          <Box display="flex" alignItems="center">
            <RocketRoundedIcon fontSize="large" htmlColor="#b3ff68" />
            <Box ml={2}>
              <Typography
                sx={{
                  background: 'linear-gradient(35deg, #81ff36 0%, #22ffdb 45%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  WebkitBoxDecorationBreak: 'clone',
                }}
                color="#b3ff68"
                variant="h5"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="bold"
              >
                Supercharge your innovation
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Montserrat', sans-serif"
              >
                Use the power of blockchain to launch your innovation
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>

  );
}
