import React from 'react';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectNodeDetailsAction, selectSelectedNode, selectSelectedNodeId } from '../../nodes.selectors';
import MarkdownEditor from './MarkdownEditor';
import NodeDetailsToolbar from './NodeDetailsToolbar';

export default function NodeDetails() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const { title, description } = useSelector(selectSelectedNode);
  const nodeDetailsAction = useSelector(selectNodeDetailsAction);

  const blankDescription = (
    <Typography color="text.secondary" textAlign="center">
      { (selectedNodeId && 'This node has no description yet.') || <Box component="span" fontSize={30}>¯\_(ツ)_/¯</Box> }
    </Typography>
  );

  const nodeDescription = (
    <Box height={1} p={3}>
      {(description && <Box dangerouslySetInnerHTML={{ __html: description }} />) || blankDescription}
    </Box>
  );

  const nodeDetailsContents = {
    description: nodeDescription,
    markdownEditor: selectedNodeId && <MarkdownEditor id={selectedNodeId} />,
    workflow: <div>Workflow</div>,
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
