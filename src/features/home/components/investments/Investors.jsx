import React from 'react';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function Investors() {
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
        For Investors
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
        <li>
          <Box display="flex" alignItems="center">
            <TravelExploreRoundedIcon fontSize="large" htmlColor="#b3ff68" />

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
                {' '}
                Explore innovations
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', sans-serif"
              >
                Explore innovations you might be interested in
              </Typography>
            </Box>
          </Box>
        </li>
        <Box component="li" mt={1}>
          <Box display="flex" alignItems="center">
            <SecurityRoundedIcon fontSize="large" htmlColor="#b3ff68" />
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
                Fraud Prevention
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', sans-serif"
              >
                Make data-driven calls based on innovation activities, contributions and community feedback
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box component="li" mt={1}>
          <Box display="flex" alignItems="center">
            <GridViewRoundedIcon fontSize="large" htmlColor="#b3ff68" />
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
                ICO
              </Typography>
              <Typography
                variant="body1"
                fontFamily="'Roboto Mono', sans-serif"
              >
                Buy tokens and get a share of the innovation
              </Typography>

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
