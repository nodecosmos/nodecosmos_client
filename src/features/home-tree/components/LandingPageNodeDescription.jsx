import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export default function LandingPageNodeDescription() {
  const currentNodeId = useSelector((state) => state.app.currentNodeId);
  const currentNodeDescription = useSelector((state) => state.landingPageNodes[currentNodeId]?.description);
  const currentNodeTitle = useSelector((state) => state.landingPageNodes[currentNodeId]?.title);

  return (
    <Box>
      <Box
        borderBottom={1}
        borderColor={{
          xs: 'borders.box.xs',
          md: 'borders.box.md',
        }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={56}
      >
        {currentNodeId && <TagRounded fontSize="medium" sx={{ color: 'text.secondary' }} />}
        <Typography ml={1} textAlign="left" color="text.secondary" variant="body1">
          {(currentNodeId && (currentNodeTitle || 'No Title'))
            || 'Select a node from the tree'}
        </Typography>
      </Box>
      <Box height={1} p={2}>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign={currentNodeDescription ? 'left' : 'center'}
        >
          {currentNodeDescription || (currentNodeId && 'This node has no description yet.') || (
            <Box component="span" fontSize={30} width={1} textAlign="center">
              ¯\_(ツ)_/¯
            </Box>
          )}
        </Typography>
      </Box>
    </Box>
  );
}
