import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import NodeDetails from '../../../features/nodes/components/details/NodeDetails';
import TreeToolbar from '../../../features/trees/components/TreeToolbar';
import Workflow from '../../../features/workflows/components/Workflow';
import WorkflowContainer from '../../../features/workflows/components/WorkflowContainer';

export default function WorkflowTab() {
  const { id } = useParams();

  return (
    <Box
      width={1}
      height={1}
    >
      <WorkflowContainer>
        <TreeToolbar rootNodeId={id} />
        <Workflow nodeId="node-1" />
      </WorkflowContainer>
    </Box>
  );
}
