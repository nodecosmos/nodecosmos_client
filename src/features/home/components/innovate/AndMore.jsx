import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CollectionsIcon from '@mui/icons-material/Collections';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';

export default function Other() {
  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        p: 0,
        '& li': {
          p: 3,
          borderRadius: 3,
          cursor: 'pointer',
          color: '#a4c6d6',
          '&:hover': {
            background: '#353a42',
          },
        },
      }}
    >
      <li>
        <Box
          display="flex"
          alignItems="center"
        >
          <CollectionsIcon fontSize="large" htmlColor="#06e1ff" />

          <Box ml={3}>
            <Typography
              variant="h5"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(35deg, #06e1ff 0%, #fff857 42%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#06e1ff',
                lineHeight: 1,
              }}
            >
              {' '}
              Media
            </Typography>
            <Typography
              variant="body1"
              fontFamily="'Roboto Mono', sans-serif"
              fontWeight="bold"
              mt={2}
              sx={{
                background: 'linear-gradient(35deg, #06e1ff 0%, #fff857 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#06e1ff',
                lineHeight: 1,
              }}
            >
              Add media gallery to your nodes.
            </Typography>
          </Box>
        </Box>
      </li>
      <Box component="li" mt={2}>
        <Box
          display="flex"
          alignItems="center"
        >
          <ShapeLineIcon fontSize="large" htmlColor="#e366ff" />
          <Box ml={3}>
            <Typography
              variant="h5"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(35deg, #e366ff 0%, #5ac5ff 42%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#cbbbff',
                lineHeight: 1,
              }}
            >
              Drawing
            </Typography>
            <Typography
              variant="body1"
              fontFamily="'Roboto Mono', sans-serif"
              fontWeight="bold"
              mt={2}
              sx={{
                background: 'linear-gradient(35deg, #e366ff 0%, #5ac5ff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#cbbbff',
                lineHeight: 1,
              }}
            >
              Sketch your nodes on the canvas.
            </Typography>

          </Box>
        </Box>
      </Box>
      <Box component="li" mt={2}>
        <Box
          display="flex"
          alignItems="center"
        >
          <TimelineRoundedIcon fontSize="large" htmlColor="#d8ff00" />
          <Box
            ml={3}
          >
            <Typography
              variant="h5"
              fontFamily="'Montserrat', sans-serif"
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(35deg, #d8ff00 0%, #4abaff 42%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#d8ff00',
                lineHeight: 1,
              }}
            >
              Insights
            </Typography>
            <Typography
              variant="body1"
              fontFamily="'Roboto Mono', sans-serif"
              fontWeight="bold"
              mt={2}
              sx={{
                background: 'linear-gradient(35deg, #d8ff00 0%, #4abaff 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitBoxDecorationBreak: 'clone',
                color: '#d8ff00',
                lineHeight: 1,
              }}
            >
              Analyze traffic to your nodes.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
