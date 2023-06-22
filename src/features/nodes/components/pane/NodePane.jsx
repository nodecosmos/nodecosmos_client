import React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectNodeDetailsAction, selectSelectedNodeId } from '../../nodes.selectors';
import NodePaneToolbar from './NodePaneToolbar';
import NodePaneMarkdownEditor from './content/NodePaneMarkdownEditor';
import NodePaneDescription from './content/NodePaneDescription';
import NodePaneWorkflow from './content/NodePaneWorkflow';

export default function NodePane() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const nodePaneContent = useSelector(selectNodeDetailsAction);

  const nodePaneContents = {
    description: <NodePaneDescription />,
    markdown: <NodePaneMarkdownEditor />,
    workflow: <NodePaneWorkflow />,
  };

  return (
    <Box
      width={1}
      height={1}
      backgroundColor="background.6"
      sx={{ overflow: 'hidden' }}
      position="relative"
      zIndex={1}
    >
      <NodePaneToolbar id={selectedNodeId} />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" pt={0.25}>
        {nodePaneContents[nodePaneContent]}
      </Box>
    </Box>
  );
}
