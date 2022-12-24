import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../app/components/GradientText';
import Tree from '../landing-page-tree/Tree';
import PanTip from '../tips/PanTip';

const airplaneNodeId = '635a91ea690cc413ead79ce2';

export default function LandingPageTree() {
  return (
    <Box>
      <GradientText text="Structure your innovation" />
      <Typography mt={3} variant="body1">
        Use the Node Tree feature to structure your innovation.
        Each node can represent a component of your project, an ingredient in your recipe,
        or other type of constituent depending on your project.
        Furthermore, nodes can be reused and shared between projects.
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
          sx={{
            borderBottom: '1px solid',
            borderColor: {
              xs: '#202027',
              md: '#101013',
            },
            boxShadow: {
              xs: '0px 3px 1px -2px rgb(68 66 72 / 20%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
              md: '0px 3px 1px -2px rgb(66 70 72 / 50%), 0px 1px 2px 0px rgb(68 66 72 / 20%)',
            },
          }}
        >
          <Typography
            variant="body2"
            color="text.tertiary"
            pb="4px"
            mx={{
              xs: 3,
              sm: 4,
            }}
            fontSize={{
              xs: 12,
              sm: 14,
            }}
          >
            Sample
            <b> Node Tree </b>
            playground
            representing the structure of an
            <b> airplane </b>
            and its components.
            Click on a node to see its details, and feel free to add, edit or delete nodes.
          </Typography>
        </Box>
        <Box sx={{
          borderBottom: {
            sm: 'none',
            md: '1px solid',
          },
          borderColor: {
            xs: '#202027',
            md: '#101013',
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
