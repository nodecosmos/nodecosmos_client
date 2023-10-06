import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transformable from '../../../../common/components/Transformable';
import useWorkflowContext from '../../hooks/useWorkflowContext';
import { selectWorkflowScale } from '../../workflows.selectors';
import { selectWorkflowFlows } from '../../../flows/flows.selectors';
import { selectWorkflowFlowSteps } from '../../../flow-steps/flowSteps.selectors';
import useWorkflowDiagramPositionCalculator from '../../hooks/diagram/useWorkflowDiagramPositionCalculator';
import { buildWorkflow, setWorkflowDiagramPosition } from '../../workflowsSlice';
import WorkflowSteps from './workflow-steps/WorkflowSteps';
import StartStep from './StartStep';

export default function WorkflowContent() {
  const {
    id,
    transformableId,
    flowIds,
    initialInputIds,
  } = useWorkflowContext();
  const wfScale = useSelector(selectWorkflowScale);
  const flows = useSelector(selectWorkflowFlows(id));
  const flowSteps = useSelector(selectWorkflowFlowSteps(id));
  const workflowDiagramPosition = useWorkflowDiagramPositionCalculator(id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    dispatch(buildWorkflow({
      id,
      initialInputIds,
      flowIds,
      flows,
      flowSteps,
    }));
  }, [dispatch, id, initialInputIds, flowIds, flows, flowSteps]);

  useEffect(() => {
    dispatch(setWorkflowDiagramPosition(workflowDiagramPosition));
  }, [dispatch, id, workflowDiagramPosition]);

  if (!Object.keys(workflowDiagramPosition).length > 0) return null;

  return (
    <Transformable
      transformableId={transformableId}
      scale={wfScale}
      heightMargin={-19}
    >
      <g>
        <StartStep workflowId={id} />
        <WorkflowSteps workflowId={id} />
      </g>
    </Transformable>
  );
}
