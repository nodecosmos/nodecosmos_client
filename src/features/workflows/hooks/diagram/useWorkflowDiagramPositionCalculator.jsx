import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MARGIN_TOP } from '../../../trees/trees.constants';
import { EDGE_LENGTH, INPUT_WIDTH, MARGIN_LEFT } from '../../workflows.constants';
import { selectWorkflowDiagram } from '../../workflows.selectors';

export default function useWorkflowDiagramPositionCalculator(id) {
  const workflowDiagram = useSelector(selectWorkflowDiagram(id));

  return useMemo(() => {
    if (!workflowDiagram.workflowSteps || workflowDiagram.workflowSteps.length === 0) return {};

    const result = {};
    workflowDiagram.initialInputs.forEach((initialInput, index) => {
      const prevInputId = workflowDiagram.initialInputs[index - 1]?.diagramId;
      const upperSiblingY = result[prevInputId]?.yEnd || 0;

      result[initialInput.diagramId] = {
        x: EDGE_LENGTH,
        xEnd: EDGE_LENGTH + INPUT_WIDTH,
        y: upperSiblingY + EDGE_LENGTH + MARGIN_TOP,
        yEnd: upperSiblingY + EDGE_LENGTH + MARGIN_TOP,
      };
    });

    workflowDiagram.workflowSteps.forEach((wfStep, index) => {
      const wfStepPosition = {
        x: (EDGE_LENGTH + INPUT_WIDTH) * (index + 1),
        xEnd: (EDGE_LENGTH + INPUT_WIDTH) * (index + 1) + INPUT_WIDTH,
        y: (EDGE_LENGTH + MARGIN_TOP) * (index + 1),
      };

      result[wfStep.diagramId] = wfStepPosition;

      wfStep.flowSteps.forEach((flowStep, flowStepIndex) => {
        const prevFlowStepId = wfStep.flowSteps[flowStepIndex - 1]?.diagramId;
        const upperFlowStepSiblingY = result[prevFlowStepId]?.yEnd || 0;

        const flowStepPosition = {
          x: wfStepPosition.x,
          xEnd: wfStepPosition.xEnd,
          y: wfStepPosition.y + upperFlowStepSiblingY + EDGE_LENGTH + MARGIN_TOP,
          yEnd: wfStepPosition.y + upperFlowStepSiblingY + EDGE_LENGTH + MARGIN_TOP,
        };

        flowStep.nodes.forEach((node, nodeIndex) => {
          const prevNodeId = flowStep.nodes[nodeIndex - 1]?.diagramId;
          const upperNodeSiblingY = result[prevNodeId]?.yEnd || 0;

          const nodePosition = {
            x: flowStepPosition.x,
            xEnd: flowStepPosition.xEnd,
            y: flowStepPosition.y + upperNodeSiblingY + EDGE_LENGTH + MARGIN_TOP,
            yEnd: flowStepPosition.y + upperNodeSiblingY + EDGE_LENGTH + MARGIN_TOP,
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
              x: nodePosition.x + MARGIN_LEFT,
              xEnd: nodePosition.xEnd + MARGIN_LEFT,
              y: nodePosition.y + upperOutputSiblingY + EDGE_LENGTH + MARGIN_TOP,
              yEnd: nodePosition.y + upperOutputSiblingY + EDGE_LENGTH + MARGIN_TOP,
            };
          });
        });
      });
    });

    return result;
  }, [workflowDiagram.workflowSteps, workflowDiagram.initialInputs]);
}
