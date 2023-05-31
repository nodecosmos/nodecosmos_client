import {
  buildDefaultIODiagramId,
  buildDiagramNodeId,
  buildIODiagramId,
  buildWorkflowStepDiagramId,
} from '../workflows.memoize';

export default {
  buildWorkflowDiagram: (state, action) => {
    const {
      workflow,
      flows,
      flowSteps,
    } = action.payload;

    const prevStepOutputsDiagramIdByIOId = {};

    state.workflowDiagramById[workflow.id] = {
      initialInputs: [],
      workflowSteps: [],
    };

    state.workflowDiagramById[workflow.id].initialInputs = workflow.initialInputs.map((inputId) => {
      const diagramId = buildDefaultIODiagramId(workflow.id, inputId);
      prevStepOutputsDiagramIdByIOId[inputId] = diagramId;

      return {
        id: inputId,
        diagramId,
      };
    });

    workflow.flowIds.forEach((flowId) => {
      const flow = flows[flowId];
      flow.stepIds.forEach((flowStepId, index) => {
        const flowStep = flowSteps[flowStepId];

        const nodes = flowStep.nodeIds.map((nodeId) => {
          const diagramId = buildDiagramNodeId(flowStepId, nodeId);
          return {
            id: nodeId,
            diagramId,
          };
        });

        const inputsByNodeId = Object.keys(flowStep.inputIdsByNodeId).reduce((acc, nodeId) => {
          const nodeDiagramId = buildDiagramNodeId(flowStepId, nodeId);

          acc[nodeId] = flowStep.inputIdsByNodeId[nodeId].map((inputId) => ({
            id: inputId,
            nodeDiagramId,
            diagramId: prevStepOutputsDiagramIdByIOId[inputId],
          }));
          return acc;
        }, {});

        // append unique output objects for diagram
        const outputsByNodeId = Object.keys(flowStep.outputIdsByNodeId).reduce((acc, nodeId) => {
          acc[nodeId] = flowStep.outputIdsByNodeId[nodeId].map((outputId) => {
            const diagramId = buildIODiagramId(flowStepId, nodeId, outputId);
            prevStepOutputsDiagramIdByIOId[outputId] = diagramId;

            return {
              id: outputId,
              diagramId,
            };
          });
          return acc;
        }, {});

        state.workflowDiagramById[workflow.id].workflowSteps[index] ||= {
          diagramId: buildWorkflowStepDiagramId(workflow.id, index),
          flowSteps: [],
        };
        state.workflowDiagramById[workflow.id].workflowSteps[index].flowSteps.push({
          diagramId: flowStepId,
          flowStepId,
          flowId,
          nodes,
          nodeIds: flowStep.nodeIds,
          inputsByNodeId,
          outputsByNodeId,
        });
      });
    });
  },
};
