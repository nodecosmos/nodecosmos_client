import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export default function LandingPageNodeDescription() {
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const currentNode = useSelector((state) => state.landingPageNodes[currentNodeID]);

  const blankDescription = (
    <Typography color="text.secondary" textAlign="center">
      {(currentNode && 'This node has no description yet.') || (
        <Box component="span" fontSize={30}>
          ¯\_(ツ)_/¯
        </Box>
      )}
    </Typography>
  );

  return (
    <Box>
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
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={56}
      >
        <Typography textAlign="center" color="text.secondary">
          {(!!currentNode && (currentNode?.title || 'No Title'))
            || 'Select a node from the tree to view its description'}
        </Typography>
      </Box>
      <Box height={1} p={2}>
        {
            (
              currentNode
              && currentNode.description
              && (
              <Typography variant="body1" color="text.secondary">
                {currentNode.description}
              </Typography>
              )
            ) || blankDescription
          }
      </Box>
    </Box>
  );
}
