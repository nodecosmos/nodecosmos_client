import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Transformable from '../../app/components/Transformable';
import { selectWorkflowFlowSteps } from '../../flow-steps/flowSteps.selectors';
import { selectWorkflowFlows } from '../../flows/flows.selectors';
import useWorkflowDiagramPositionCalculator from '../hooks/diagram/useWorkflowDiagramPositionCalculator';
import { selectWorkflowDiagram, selectWorkflowsByNodeId } from '../workflows.selectors';
import { buildWorkflow, setWorkflowDiagramPosition } from '../workflowsSlice';
import InputBranch from './InputBranch';
import IoBranch from './IoBranch';
import Start from './Start';
import WorkflowNodeButton from './WorkflowNodeButton';
import WorkflowOutputButton from './WorkflowOutputButton';

export default function Workflow({ nodeId }) {
  const containerRef = useRef(null);
  const workflows = useSelector(selectWorkflowsByNodeId(nodeId));

  const workflow = workflows[0];

  const flows = useSelector(selectWorkflowFlows(workflow.id));
  const flowSteps = useSelector(selectWorkflowFlowSteps(workflow.id));
  const workflowDiagramPosition = useWorkflowDiagramPositionCalculator(workflow.id);

  const workflowDiagram = useSelector(selectWorkflowDiagram(workflow.id));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildWorkflow({
      workflow,
      flows,
      flowSteps,
    }));
  }, [dispatch, workflow, flows, flowSteps]);

  useEffect(() => {
    dispatch(setWorkflowDiagramPosition(workflowDiagramPosition));
  }, [dispatch, workflow.id, workflowDiagramPosition]);

  if (!workflowDiagram.initialInputs || !Object.keys(workflowDiagramPosition).length > 0) return null;

  return (
    <Transformable containerRef={containerRef} transformableId="workflow">
      <g>
        <Start workflowId={workflow.id} />
        {
          workflowDiagram.initialInputs.map((input) => (
            <g key={input.id}>
              <WorkflowOutputButton
                diagramId={input.diagramId}
                id={input.id}
              />
            </g>
          ))
        }
        {
            workflowDiagram.workflowSteps.map((wfStep) => (
              <g key={wfStep.diagramId}>
                {
                  wfStep.flowSteps.map((flowStep) => flowStep.nodes.map((node, index) => (
                    <g key={node.diagramId}>
                      {
                        flowStep.inputsByNodeId[node.id]?.map((input) => (
                          <g key={input.id}>
                            <InputBranch
                              nodeDiagramId={input.nodeDiagramId}
                              outputId={input.id}
                              outputDiagramId={input.diagramId}
                            />
                          </g>
                        ))
                      }
                      <WorkflowNodeButton diagramId={node.diagramId} id={node.id} />
                      <IoBranch diagramId={node.diagramId} />
                      {
                          flowStep.outputsByNodeId[node.id]?.map((input) => (
                            <g key={input.id}>
                              <WorkflowOutputButton
                                diagramId={input.diagramId}
                                id={input.id}
                              />
                            </g>
                          ))
                        }
                    </g>
                  )))
                }
              </g>
            ))
        }
      </g>
    </Transformable>
  );
}

Workflow.propTypes = {
  nodeId: PropTypes.string.isRequired,
};
