import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  EDGE_LENGTH,
  MARGIN_LEFT,
  WORKFLOW_START_MARGIN_TOP,
  OUTPUT_EDGE_LENGTH,
  WORKFLOW_STEP_HEIGHT,
  WORKFLOW_STEP_WIDTH,
  FLOW_STEP_SIZE,
} from '../../workflows.constants';
import { selectWorkflowDiagram } from '../../workflows.selectors';

export default function useWorkflowDiagramPositionCalculator(id) {
  const workflowDiagram = useSelector(selectWorkflowDiagram(id));

  return useMemo(() => {
    if (!workflowDiagram.workflowSteps || workflowDiagram.workflowSteps.length === 0) return {};

    const result = {};
    workflowDiagram.initialInputIds.forEach((initialInputId, index) => {
      const prevInputId = workflowDiagram.initialInputIds[index - 1];
      const upperSiblingY = result[prevInputId]?.yEnd || OUTPUT_EDGE_LENGTH + WORKFLOW_START_MARGIN_TOP;

      result[initialInputId] = {
        x: OUTPUT_EDGE_LENGTH + MARGIN_LEFT,
        xEnd: OUTPUT_EDGE_LENGTH * 2 + MARGIN_LEFT,
        y: upperSiblingY + OUTPUT_EDGE_LENGTH,
        yEnd: upperSiblingY + OUTPUT_EDGE_LENGTH,
      };
    });

    workflowDiagram.workflowSteps.forEach((wfStep, wfStepIndex) => {
      const wfStepPosition = {
        x: WORKFLOW_STEP_WIDTH * (wfStepIndex + 1),
        xEnd: WORKFLOW_STEP_WIDTH * (wfStepIndex + 1),
        y: (WORKFLOW_STEP_HEIGHT) * (wfStepIndex + 1) + WORKFLOW_START_MARGIN_TOP,
        yEnd: (WORKFLOW_STEP_HEIGHT) * (wfStepIndex + 1) + WORKFLOW_START_MARGIN_TOP,
      };

      result[wfStep.diagramId] = wfStepPosition;

      if (!wfStep.wfStepFlows) return;

      wfStep.wfStepFlows.forEach((flow, flowIndex) => {
        const prevFlowId = wfStep.wfStepFlows[flowIndex - 1]?.diagramId;
        const upperFlowSiblingYEnd = result[prevFlowId]?.yEnd || 0;

        const flowPosition = {
          x: WORKFLOW_STEP_WIDTH * (wfStepIndex + 1),
          y: upperFlowSiblingYEnd + FLOW_STEP_SIZE * (wfStepIndex + 1),
          yEnd: upperFlowSiblingYEnd + FLOW_STEP_SIZE * (wfStepIndex + 1),
        };

        if (flow.flowStep) {
          const flowStepPosition = {
            x: wfStepPosition.x,
            xEnd: wfStepPosition.xEnd,
            y: flowPosition.y,
            yEnd: flowPosition.yEnd,
          };

          flow.flowStep.nodes.forEach((node, nodeIndex) => {
            const prevNodeId = flow.flowStep.nodes[nodeIndex - 1]?.diagramId;
            const upperNodeSiblingYEnd = result[prevNodeId]?.yEnd || flowStepPosition.y + WORKFLOW_START_MARGIN_TOP;

            const outputs = flow.flowStep.outputIdsByNodeId[node.id] || [];

            const y = upperNodeSiblingYEnd + OUTPUT_EDGE_LENGTH;

            const nodePosition = {
              x: flowStepPosition.x,
              xEnd: flowStepPosition.x + EDGE_LENGTH,
              y,
              yEnd: y + OUTPUT_EDGE_LENGTH * outputs.length,
            };

            outputs.forEach((output, outputIndex) => {
              const prevOutputId = outputs[outputIndex - 1]?.id;
              const upperOutputSiblingY = result[prevOutputId]?.yEnd || nodePosition.y;

              nodePosition.yEnd = upperOutputSiblingY + OUTPUT_EDGE_LENGTH;

              result[output.id] = {
                x: nodePosition.x + EDGE_LENGTH + MARGIN_LEFT,
                xEnd: nodePosition.xEnd + EDGE_LENGTH * 2,
                y: upperOutputSiblingY + OUTPUT_EDGE_LENGTH,
                yEnd: upperOutputSiblingY + OUTPUT_EDGE_LENGTH,
              };
            });

            result[node.diagramId] = nodePosition;
            flowPosition.yEnd = nodePosition.yEnd;
          });
        }

        result[flow.diagramId] = flowPosition;
      });
    });

    return result;
  }, [workflowDiagram.workflowSteps, workflowDiagram.initialInputIds]);
}
