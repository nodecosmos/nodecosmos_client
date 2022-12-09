import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tree from '../landing-page-tree/Tree';
import PanTip from '../tips/PanTip';

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
        Use
        {' '}
        <Box component="span">Node Tree</Box>
        {' '}
        feature to structure your innovation and make it easy to browse
        components of your project, ingredients of your recipe or other node types.
      </Typography>
      <Box
        mx={{
          // as defined in src/features/home/components/Section.jsx:28
          xs: -3,
          sm: -4,
        }}
        mt={3}
      >
        <Box
          zIndex={2}
          sx={{
            borderBottom: '1px solid #202027',
            boxShadow: {
              xs: '0px 3px 1px -2px rgb(68 66 72 / 20%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
              md: '0px 3px 1px -2px rgb(66 70 72 / 50%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
            },
          }}
        >
          <Typography
            variant="body2"
            color="#656e76"
            pb="4px"
            mx={{
              // as defined in src/features/home/components/Section.jsx:28
              xs: 3,
              sm: 4,
            }}
            textAlign={{
              xs: 'center',
              md: 'left',
            }}
            fontSize={{
              xs: 12,
              sm: 14,
            }}
          >
            Sample
            <b> Node Tree </b>
            representing the structure of an
            <b> airplane </b>
            and its components.
            <br />
          </Typography>
        </Box>
        <Box sx={{
          borderBottom: {
            sm: 'none',
            md: '1px solid #202027',
          },
          boxShadow: {
            sm: 'none',
            md: '0px 3px 1px -2px rgb(66 70 72 / 50%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
          },
        }}
        >
          <Tree id={airplaneNodeId} />
        </Box>
      </Box>
      <PanTip />
    </Box>
  );
}
