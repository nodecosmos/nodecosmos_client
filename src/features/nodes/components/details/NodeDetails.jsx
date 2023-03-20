import React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectNodeDetailsAction, selectSelectedNodeId } from '../../nodes.selectors';
import MarkdownEditor from './MarkdownEditor';
import NodeDescription from './NodeDescription';
import NodeDetailsToolbar from './NodeDetailsToolbar';

export default function NodeDetails() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

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
      <NodeDetailsToolbar id={selectedNodeId} />
      <Box height="calc(100% - 56px)" overflow="auto" pt={0.25}>
        {nodeDetailsContents[nodeDetailsAction]}
      </Box>
    </Box>
  );
}
