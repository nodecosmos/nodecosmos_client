import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Transformable from '../../../app/components/Transformable';
import { selectWorkflowFlowSteps } from '../../../flow-steps/flowSteps.selectors';
import { selectWorkflowFlows } from '../../../flows/flows.selectors';
import useWorkflowDiagramPositionCalculator from '../../hooks/diagram/useWorkflowDiagramPositionCalculator';
import { selectWorkflowsByNodeId } from '../../workflows.selectors';
import { buildWorkflow, setWorkflowDiagramPosition } from '../../workflowsSlice';
import Start from './Start';
import WorkflowSteps from './WorkflowSteps';

export default function Workflow({ nodeId }) {
  const containerRef = useRef(null);
  const workflows = useSelector(selectWorkflowsByNodeId(nodeId));

  const workflow = useMemo(() => workflows[0] || {}, [workflows]);

  const flows = useSelector(selectWorkflowFlows(workflow.id));
  const flowSteps = useSelector(selectWorkflowFlowSteps(workflow.id));
  const workflowDiagramPosition = useWorkflowDiagramPositionCalculator(workflow.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!workflow.id) return;

    dispatch(buildWorkflow({
      workflow,
      flows,
      flowSteps,
    }));
  }, [dispatch, workflow, flows, flowSteps]);

  useEffect(() => {
    dispatch(setWorkflowDiagramPosition(workflowDiagramPosition));
  }, [dispatch, workflow.id, workflowDiagramPosition]);

  if (!Object.keys(workflowDiagramPosition).length > 0) return null;

  return (
    <Transformable containerRef={containerRef} transformableId="workflow">
      <g>
        <Start workflowId={workflow.id} />
        <WorkflowSteps workflowId={workflow.id} />
      </g>
    </Transformable>
  );
}

Workflow.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
