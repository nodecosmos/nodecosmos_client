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

    const positionsByDiagramId = {};

    workflowDiagram.initialInputIds.forEach((initialInputId, index) => {
      const prevInputId = workflowDiagram.initialInputIds[index - 1];
      const upperSiblingY = positionsByDiagramId[prevInputId]?.yEnd || OUTPUT_EDGE_LENGTH + WORKFLOW_START_MARGIN_TOP;

      positionsByDiagramId[initialInputId] = {
        x: OUTPUT_EDGE_LENGTH + MARGIN_LEFT,
        xEnd: OUTPUT_EDGE_LENGTH * 2 + MARGIN_LEFT,
        y: upperSiblingY + OUTPUT_EDGE_LENGTH,
        yEnd: upperSiblingY + OUTPUT_EDGE_LENGTH,
      };
    });

    let prevFlowYEnd = 0;

    if (!workflowDiagram.flowsCount) {
      workflowDiagram.workflowSteps.forEach((wfStep, wfStepIndex) => {
        positionsByDiagramId[wfStep.diagramId] = {
          x: WORKFLOW_STEP_WIDTH * (wfStepIndex + 1),
          xEnd: WORKFLOW_STEP_WIDTH * (wfStepIndex + 1),
          y: (WORKFLOW_STEP_HEIGHT) * (wfStepIndex + 1) + WORKFLOW_START_MARGIN_TOP,
          yEnd: (WORKFLOW_STEP_HEIGHT) * (wfStepIndex + 1) + WORKFLOW_START_MARGIN_TOP,
        };
      });
    }

    for (let flowIndex = 0; flowIndex < workflowDiagram.flowsCount; flowIndex += 1) {
      let currentFlowYEnd = 0;

      // eslint-disable-next-line no-loop-func
      workflowDiagram.workflowSteps.forEach((wfStep, wfStepIndex) => {
        const wfStepPosition = {
          x: WORKFLOW_STEP_WIDTH * (wfStepIndex + 1),
          xEnd: WORKFLOW_STEP_WIDTH * (wfStepIndex + 1),
          y: (WORKFLOW_STEP_HEIGHT) * (wfStepIndex + 1) + WORKFLOW_START_MARGIN_TOP,
          yEnd: (WORKFLOW_STEP_HEIGHT) * (wfStepIndex + 1) + WORKFLOW_START_MARGIN_TOP,
        };
        positionsByDiagramId[wfStep.diagramId] = wfStepPosition;

        const flow = wfStep.wfStepFlows[flowIndex];
        if (!flow) return;

        const prevFlowId = wfStep.wfStepFlows[flowIndex - 1]?.diagramId;
        const upperFlowSiblingYEnd = positionsByDiagramId[prevFlowId]?.yEnd || 0;

        const flowPosition = {
          x: positionsByDiagramId[wfStep.diagramId].x,
          y: (prevFlowYEnd || upperFlowSiblingYEnd) + FLOW_STEP_SIZE,
          yEnd: (prevFlowYEnd || upperFlowSiblingYEnd) + FLOW_STEP_SIZE,
        };

        if (flow.flowStep) {
          const flowStepPosition = {
            x: flowPosition.x,
            xEnd: flowPosition.xEnd,
            y: flowPosition.y,
            yEnd: flowPosition.yEnd,
          };

          flow.flowStep.nodes.forEach((node, nodeIndex) => {
            const prevNodeId = flow.flowStep.nodes[nodeIndex - 1]?.diagramId;
            const upperNodeSiblingYEnd = positionsByDiagramId[prevNodeId]?.yEnd
              || flowStepPosition.y + WORKFLOW_START_MARGIN_TOP;

            const outputIds = flow.flowStep.outputIdsByNodeId[node.id] || [];

            const y = upperNodeSiblingYEnd + OUTPUT_EDGE_LENGTH;

            const nodePosition = {
              x: flowStepPosition.x,
              xEnd: flowStepPosition.x + EDGE_LENGTH,
              y,
              yEnd: y + OUTPUT_EDGE_LENGTH * outputIds.length,
            };

            outputIds.forEach((outputId, outputIndex) => {
              const prevOutputId = outputIds[outputIndex - 1];
              const upperOutputSiblingY = positionsByDiagramId[prevOutputId]?.yEnd || nodePosition.y;

              nodePosition.yEnd = upperOutputSiblingY + OUTPUT_EDGE_LENGTH;

              positionsByDiagramId[outputId] = {
                x: nodePosition.x + EDGE_LENGTH + MARGIN_LEFT,
                xEnd: nodePosition.xEnd + EDGE_LENGTH * 2,
                y: upperOutputSiblingY + OUTPUT_EDGE_LENGTH,
                yEnd: upperOutputSiblingY + OUTPUT_EDGE_LENGTH,
              };
            });

            positionsByDiagramId[node.diagramId] = nodePosition;
            flowPosition.yEnd = nodePosition.yEnd;
            wfStepPosition.yEnd = nodePosition.yEnd;
          });
        }

        positionsByDiagramId[flow.diagramId] = flowPosition;
        currentFlowYEnd = Math.max(flowPosition.yEnd, currentFlowYEnd);

        // set y end of whole workflow diagram
        positionsByDiagramId[id] = {
          yEnd: Math.max(prevFlowYEnd, currentFlowYEnd) + 500,
        };
      });

      prevFlowYEnd = currentFlowYEnd;
    }
    return positionsByDiagramId;
  }, [workflowDiagram.workflowSteps, workflowDiagram.initialInputIds, workflowDiagram.flowsCount, id]);
}
