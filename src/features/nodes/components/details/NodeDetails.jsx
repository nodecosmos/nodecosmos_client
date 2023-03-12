import React from 'react';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectNodeDetailsAction, selectSelectedNode, selectSelectedNodeId } from '../../nodes.selectors';
import MarkdownEditor from './MarkdownEditor';
import NodeDescription from './NodeDescription';
import NodeDetailsToolbar from './NodeDetailsToolbar';

export default function NodeDetails() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const { title } = useSelector(selectSelectedNode);
  const nodeDetailsAction = useSelector(selectNodeDetailsAction);

  const nodeDetailsContents = {
    description: <NodeDescription />,
    markdownEditor: <MarkdownEditor />,
    workflow: <Box />,
  };

  return (
    <Box
      height={1}
      backgroundColor="background.6"
      sx={{ overflow: 'hidden' }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={HEADER_HEIGHT}
        borderColor="borders.4"
        boxShadow="2"
        position="relative"
        zIndex={1}
      >
        <NodeDetailsToolbar id={selectedNodeId} />
        <Box display="flex" alignItems="center">
          {title && <FontAwesomeIcon icon={faHashtag} />}
          <Typography
            align="center"
            variant="body1"
            ml={1}
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {title || 'Select a node from the tree to view its description'}
          </Typography>
        </Box>
        <div />
      </Box>
      <Box height="calc(100% - 56px)" overflow="auto">
        {nodeDetailsContents[nodeDetailsAction]}
      </Box>
    </Box>
  );
}
