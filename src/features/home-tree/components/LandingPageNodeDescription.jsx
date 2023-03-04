import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import {
  faHashtag,
} from '@fortawesome/pro-regular-svg-icons';

export default function LandingPageNodeDescription() {
  const currentNodeId = useSelector((state) => state.app.currentNodeId);
  const currentNodeDescription = useSelector((state) => state.landingPageNodes[currentNodeId]?.description);
  const currentNodeTitle = useSelector((state) => state.landingPageNodes[currentNodeId]?.title);

  return (
    <Box>
      <Box
        backgroundColor="background.7"
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={56}
        sx={{
          '.fa-hashtag': {
            mt: -0.25,
            color: 'background.list.default',
            fontSize: '1.25rem',
          },
        }}
      >
        {currentNodeId && <FontAwesomeIcon icon={faHashtag} />}
        <Typography
          ml={1}
          textAlign="left"
          variant="h6"
          fontWeight="bold"
          lineHeight={1}
          sx={{
            fontSize: '1.05rem',
          }}
        >
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
