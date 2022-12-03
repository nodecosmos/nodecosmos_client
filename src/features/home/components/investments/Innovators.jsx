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
        Innovators
      </Typography>
      <Box
        mt={3}
        component="ul"
        sx={{
          listStyle: 'none',
          p: 0,
          '& li': {
            p: 3,
            borderRadius: 3,
            cursor: 'pointer',
            '&:hover': {
              background: '#353a42',
            },
          },
        }}
      >
        <li>
          <Box display="flex" alignItems="center">
            <TokenRoundedIcon fontSize="large" htmlColor="#b3ff68" />

            <Box ml={3}>
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
                fontFamily="'Roboto Mono', sans-serif"
                fontWeight="bold"
              >
                Issue
                {' '}
                <Box
                  component="a"
                  href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/"
                  target="_blank"
                  color="#e4cdff"
                  fontWeight="bold"
                  sx={{
                    cursor: 'pointer',
                    borderBottom: '4px solid #e4cdff',
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
        <Box component="li" mt={2}>
          <Box display="flex" alignItems="center">
            <CurrencyExchangeRoundedIcon fontSize="large" htmlColor="#b3ff68" />
            <Box ml={3}>
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
                fontFamily="'Roboto Mono', sans-serif"
                fontWeight="bold"
              >
                Sell your tokens to investors
              </Typography>

            </Box>
          </Box>
        </Box>
        <Box component="li" mt={2}>
          <Box display="flex" alignItems="center">
            <RocketRoundedIcon fontSize="large" htmlColor="#b3ff68" />
            <Box ml={3}>
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
                Get Ready
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', sans-serif"
                fontWeight="bold"
              >
                Launch your innovation
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>

  );
}
