import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Transformable from '../../app/components/Transformable';
import { selectWorkflowFlowSteps } from '../../flow-steps/flowSteps.selectors';
import { selectWorkflowFlows } from '../../flows/flows.selectors';
import useWorkflowDiagramPositionCalculator from '../hooks/diagram/useWorkflowDiagramPositionCalculator';
import { selectWorkflowsByNodeId } from '../workflows.selectors';
import { buildWorkflow, setWorkflowDiagramPosition } from '../workflowsSlice';
import IOButton from './io/IOButton';
import IOBranch from './io/IOBranch';
import Start from './Start';

export default function Workflow({ nodeId }) {
  const containerRef = useRef(null);
  const workflows = useSelector(selectWorkflowsByNodeId(nodeId));

  const workflow = workflows[0];

  const flows = useSelector(selectWorkflowFlows(workflow.id));
  const flowSteps = useSelector(selectWorkflowFlowSteps(workflow.id));
  const workflowDiagramPosition = useWorkflowDiagramPositionCalculator(workflow.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildWorkflow({
      workflow,
      flows,
      flowSteps,
    }));
  }, [dispatch, workflow, flows, flowSteps]);

  useEffect(() => {
    dispatch(
      setWorkflowDiagramPosition({
        workflowId: workflow.id,
        position: workflowDiagramPosition,
      }),
    );
  }, [dispatch, workflow.id, workflowDiagramPosition]);

  return (
    <Transformable containerRef={containerRef} transformableId="workflow">
      <g>
        <Start />
        <IOBranch />
        <IOButton />
      </g>
    </Transformable>
  );
}

Workflow.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
