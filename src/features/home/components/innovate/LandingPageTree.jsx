import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import Tree from '../landing-page-tree/Tree';

const airplaneNodeId = '635a91ea690cc413ead79ce2';

export default function LandingPageTree() {
  return (
    <Box>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="bold"
        sx={{
          background: {
            xs: 'linear-gradient(35deg, #e366ff 0%, #ff366c 45%)',
            sm: 'linear-gradient(35deg, #e366ff 0%, #ff366c 20%)',
          },
          WebkitBackgroundClip: 'text!important',
          backgroundClip: 'text!important',
          WebkitTextFillColor: 'transparent!important',
          WebkitBoxDecorationBreak: 'clone',
          color: '#fff',
          lineHeight: 1,
        }}
      >
        Structure your innovation
      </Typography>
      <Typography mt={3} variant="body1" color="#fdfff9">
        Use Node Tree to structure your innovation and make it easy to browse
        components of your project, ingredients of your recipe or other node types.
      </Typography>
      <Box mt={3}>
        <Tree id={airplaneNodeId} />
      </Box>
    </Box>
  );
}
