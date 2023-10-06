import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../../../common/components/Loader';
import Workflow from '../../../../workflows/components/diagram/Workflow';
import { selectWorkflowsByNodeId } from '../../../../workflows/workflows.selectors';
import { showWorkflow } from '../../../../workflows/workflows.thunks';
import { selectSelectedNodeId } from '../../../nodes.selectors';
import { WORKFLOW_DIAGRAM_CONTEXT } from '../../../../workflows/workflows.constants';

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
    <Workflow nodeId={selectedNodeId} context={WORKFLOW_DIAGRAM_CONTEXT.treeNodeDetails} />
  );
}
