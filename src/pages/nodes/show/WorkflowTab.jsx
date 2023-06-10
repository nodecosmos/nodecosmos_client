import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import Workflow from '../../../features/workflows/components/diagram/Workflow';
import WorkflowContainer from '../../../features/workflows/components/WorkflowContainer';
import WorkflowToolbar from '../../../features/workflows/components/WorkflowToolbar';
import { showWorkflow } from '../../../features/workflows/workflows.thunks';

export default function WorkflowTab() {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showWorkflow(id));
  }, [dispatch, id]);

  return (
    <Box
      width={1}
      height={1}
    >
      <WorkflowContainer>
        <WorkflowToolbar nodeId={id} />
        <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
          <Workflow nodeId={id} />
        </Box>
      </WorkflowContainer>
    </Box>
  );
}
