import React from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectNodeDetailsAction, selectSelectedNodeId } from '../../nodes.selectors';
import NodePaneToolbar from './NodePaneToolbar';
import MarkdownEditor from './content/MarkdownEditor';
import NodeDescription from './content/NodeDescription';
import WorkflowDetails from './content/WorkflowDetails';

export default function NodePane() {
  const selectedNodeId = useSelector(selectSelectedNodeId);

  const nodeDetailsAction = useSelector(selectNodeDetailsAction);

  const nodeDetailsContents = {
    description: <NodeDescription />,
    markdownEditor: <MarkdownEditor />,
    workflow: <WorkflowDetails />,
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
        {nodeDetailsContents[nodeDetailsAction]}
      </Box>
    </Box>
  );
}
