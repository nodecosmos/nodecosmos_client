import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import GradientText from '../../../../common/components/GradientText';
import Tree from '../../../home-tree/components/LandingPageTree';
import PanTip from '../tips/PanTip';

const airplaneNodeId = '635a91ea690cc413ead79ce2';

export default function LandingPageTree() {
  return (
    <Box
      mb={{
        xs: -3,
        sm: -4,
        md: 0,
      }}
    >
      <GradientText text="Structure your Innovation" variant="h5" variantMapping={{ h5: 'h3' }} />
      <Typography mt={3} variant="body1" color="text.secondary">
        Use the Node Tree feature to structure your innovation.
        Each node can represent a component of your project, an ingredient in your recipe,
        or other type of constituent depending on your project.
        Furthermore, individual nodes, along with their respective subtrees,
        can be accessed independently. They can also be reused and imported into different projects.
        As a result, it allows modular approach to innovation development or knowledge sharing in general.
      </Typography>
      <Box
        mx={{
          // as defined in src/features/home/components/Section.jsx:28
          // xs: -3,
          // sm: -4,
        }}
        mt={3}
      >
        <Box>
          <Typography
            variant="body2"
            color="text.tertiary"
            pb="4px"
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
        <Box>
          <Tree id={airplaneNodeId} />
        </Box>
      </Box>
      <PanTip />
    </Box>
  );
}
