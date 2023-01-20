import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../app/components/common/GradientText';
import Tree from '../landing-page-tree/Tree';
import PanTip from '../tips/PanTip';

const airplaneNodeId = '635a91ea690cc413ead79ce2';

export default function LandingPageTree() {
  return (
    <Box>
      <GradientText text="Structure your Innovation" variant="h5" variantMapping={{ h5: 'h3' }} />
      <Typography mt={3} variant="body1" color="text.secondary">
        Use the Node Tree feature to structure your innovation.
        Each node can represent a component of your project, an ingredient in your recipe,
        or other type of constituent depending on your project.
        Furthermore, nodes can be reused and shared between projects. As a result, it allows modular approach to
        innovation development or knowledge sharing in general.
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
          borderBottom={1}
          borderColor={{
            xs: 'borders.box.xs',
            md: 'borders.box.md',
          }}
          boxShadow={{
            xs: 'boxBorder.bottom.xs',
            md: 'boxBorder.bottom.md',
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
        <Box
          borderBottom={1}
          borderColor={{
            xs: 'borders.box.xs',
            md: 'borders.box.md',
          }}
          boxShadow={{
            xs: 'boxBorder.bottom.xs',
            md: 'boxBorder.bottom.md',
          }}
        >
          <Tree id={airplaneNodeId} />
        </Box>
      </Box>
      <PanTip />
    </Box>
  );
}
