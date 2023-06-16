import React, { useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import { HEADER_HEIGHT } from '../../../../app/constants';
import Workflow from '../../../../workflows/components/diagram/Workflow';
import WorkflowContainer from '../../../../workflows/components/WorkflowContainer';
import WorkflowToolbar from '../../../../workflows/components/WorkflowToolbar';
import { selectWorkflowsByNodeId } from '../../../../workflows/workflows.selectors';
import { showWorkflow } from '../../../../workflows/workflows.thunks';
import { selectPersistentId, selectSelectedNodeId } from '../../../nodes.selectors';

export default function WorkflowDetails() {
  const selectedNodeId = useSelector(selectSelectedNodeId);
  const persistentId = useSelector(selectPersistentId(selectedNodeId));
  const [loading, setLoading] = React.useState(true);

  const workflows = useSelector(selectWorkflowsByNodeId(persistentId));
  const workflow = useMemo(() => workflows[0] || {}, [workflows]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (persistentId) {
      if (!workflow.id) setLoading(true);
      dispatch(showWorkflow(persistentId)).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, persistentId, workflow.id]);

  if (!selectedNodeId) return null;

  if (loading) {
    return <Loader />;
  }

  return (
    <WorkflowContainer>
      <WorkflowToolbar nodeId={persistentId} />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
        <Workflow nodeId={persistentId} />
      </Box>
    </WorkflowContainer>
  );
}
