import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import NodeDetails from '../../../features/nodes/components/details/NodeDetails';
import Workflow from '../../../features/workflows/components/Workflow';
import WorkflowContainer from '../../../features/workflows/components/WorkflowContainer';

export default function WorkflowTab() {
  const { id } = useParams();

  return (
    <Box display={{ xs: 'block', md: 'flex' }} width={1} height={1}>
      <Box
        width="50%"
        height="100%"
      >
        <WorkflowContainer>
          <Workflow />
        </WorkflowContainer>
      </Box>
      <Box
        width={{
          xs: 1,
          md: '50%',
        }}
      >
        <NodeDetails />
      </Box>
    </Box>
  );
}
