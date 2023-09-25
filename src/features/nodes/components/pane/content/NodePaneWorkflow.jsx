import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import { HEADER_HEIGHT } from '../../../../app/constants';
import Workflow from '../../../../workflows/components/diagram/Workflow';
import WorkflowContainer from '../../../../workflows/components/WorkflowContainer';
import WorkflowToolbar from '../../../../workflows/components/WorkflowToolbar';
import { WORKFLOW_DIAGRAM_CONTEXT } from '../../../../workflows/workflows.constants';
import { WorkflowsContext } from '../../../../workflows/workflows.context';
import { selectWorkflowsByNodeId } from '../../../../workflows/workflows.selectors';
import { showWorkflow } from '../../../../workflows/workflows.thunks';
import { selectSelectedNodeId } from '../../../nodes.selectors';

export default function NodePaneWorkflow() {
  const selectedNodeId = useSelector(selectSelectedNodeId);
  const [loading, setLoading] = React.useState(true);

  const workflows = useSelector(selectWorkflowsByNodeId(selectedNodeId));
  const workflow = useMemo(() => workflows[0] || {}, [workflows]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedNodeId) {
      if (!workflow.id) setLoading(true);
      dispatch(showWorkflow(selectedNodeId)).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, selectedNodeId, workflow.id]);

  if (!selectedNodeId) return null;

  if (loading) {
    return <Loader />;
  }

  return (
    <WorkflowsContext.Provider value={WORKFLOW_DIAGRAM_CONTEXT.treeNodeDetails}>
      <WorkflowContainer>
        <WorkflowToolbar nodeId={selectedNodeId} />
        <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
          <Workflow nodeId={selectedNodeId} />
        </Box>
      </WorkflowContainer>
    </WorkflowsContext.Provider>
  );
}
