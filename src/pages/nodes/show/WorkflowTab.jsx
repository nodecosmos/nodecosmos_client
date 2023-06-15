import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import Workflow from '../../../features/workflows/components/diagram/Workflow';
import WorkflowContainer from '../../../features/workflows/components/WorkflowContainer';
import WorkflowToolbar from '../../../features/workflows/components/WorkflowToolbar';
import { selectWorkflowsByNodeId } from '../../../features/workflows/workflows.selectors';
import { showWorkflow } from '../../../features/workflows/workflows.thunks';

export default function WorkflowTab() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const workflows = useSelector(selectWorkflowsByNodeId(id));
  const workflow = useMemo(() => workflows[0] || {}, [workflows]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (!workflow.id) setLoading(true);
    dispatch(showWorkflow(id)).then(() => setLoading(false));
  }, [dispatch, id, workflow.id]);

  if (loading) {
    return <Loader />;
  }

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
