import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MARGIN_TOP } from '../../../trees/trees.constants';
import {
  EDGE_LENGTH, MARGIN_LEFT, OUTPUT_EDGE_LENGTH, WORKFLOW_STEP_HEIGHT, WORKFLOW_STEP_WIDTH,
} from '../../workflows.constants';
import { selectWorkflowDiagram } from '../../workflows.selectors';

export default function useWorkflowDiagramPositionCalculator(id) {
  const workflowDiagram = useSelector(selectWorkflowDiagram(id));

  return useMemo(() => {
    if (!workflowDiagram.workflowSteps || workflowDiagram.workflowSteps.length === 0) return {};

    const result = {};
    workflowDiagram.initialInputs.forEach((initialInput, index) => {
      const prevInputId = workflowDiagram.initialInputs[index - 1]?.diagramId;
      const upperSiblingY = result[prevInputId]?.yEnd || OUTPUT_EDGE_LENGTH + MARGIN_TOP;

      result[initialInput.diagramId] = {
        x: EDGE_LENGTH + MARGIN_LEFT,
        xEnd: OUTPUT_EDGE_LENGTH * 2 + MARGIN_LEFT,
        y: upperSiblingY + OUTPUT_EDGE_LENGTH + MARGIN_TOP,
        yEnd: upperSiblingY + OUTPUT_EDGE_LENGTH + MARGIN_TOP,
      };
    });

    workflowDiagram.workflowSteps.forEach((wfStep, index) => {
      const wfStepPosition = {
        x: (WORKFLOW_STEP_WIDTH) * (index + 1),
        xEnd: (WORKFLOW_STEP_WIDTH) * (index + 1),
        y: (WORKFLOW_STEP_HEIGHT) * (index + 1),
        yEnd: (WORKFLOW_STEP_HEIGHT) * (index + 1),
      };

      result[wfStep.diagramId] = wfStepPosition;

      wfStep.flowSteps.forEach((flowStep, flowStepIndex) => {
        const prevFlowStepId = wfStep.flowSteps[flowStepIndex - 1]?.diagramId;
        const upperFlowStepSiblingY = result[prevFlowStepId]?.yEnd || -5;

        const flowStepPosition = {
          x: wfStepPosition.x,
          xEnd: wfStepPosition.xEnd,
          y: wfStepPosition.y + upperFlowStepSiblingY + EDGE_LENGTH,
          yEnd: wfStepPosition.y + upperFlowStepSiblingY + EDGE_LENGTH,
        };

        flowStep.nodes.forEach((node, nodeIndex) => {
          const prevNodeId = flowStep.nodes[nodeIndex - 1]?.diagramId;
          const upperNodeSiblingY = result[prevNodeId]?.yEnd || 0;

          const nodePosition = {
            x: flowStepPosition.x,
            xEnd: flowStepPosition.x + EDGE_LENGTH,
            y: flowStepPosition.y + upperNodeSiblingY + EDGE_LENGTH,
            yEnd: flowStepPosition.y + upperNodeSiblingY + EDGE_LENGTH,
          };

          result[node.diagramId] = nodePosition;

          const inputs = flowStep.inputsByNodeId[node.id] || [];
          const outputs = flowStep.outputsByNodeId[node.id] || [];

          inputs.forEach((input, inputIndex) => {
            // TODO
          });

          outputs.forEach((output, outputIndex) => {
            const prevOutputId = outputs[outputIndex - 1]?.diagramId;
            const upperOutputSiblingY = result[prevOutputId]?.yEnd || 0;

            result[output.diagramId] = {
              x: nodePosition.x + EDGE_LENGTH + MARGIN_LEFT,
              xEnd: nodePosition.xEnd + OUTPUT_EDGE_LENGTH * 2,
              y: nodePosition.y + upperOutputSiblingY + OUTPUT_EDGE_LENGTH + MARGIN_TOP,
              yEnd: nodePosition.y + upperOutputSiblingY + OUTPUT_EDGE_LENGTH + MARGIN_TOP,
            };
          });
        });
      });
    });

    return result;
  }, [workflowDiagram.workflowSteps, workflowDiagram.initialInputs]);
}
