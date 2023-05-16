import { buildDiagramNodeId, buildIODiagramId } from '../workflows.memoize';

export default {
  buildWorkflowDiagram: (state, action) => {
    const {
      workflow,
      flows,
      flowSteps,
    } = action.payload;
    state.workflowDiagramById[workflow.id] = [];

    Object.keys(flows).forEach((flowId) => {
      const flow = flows[flowId];
      flow.stepIds.forEach((flowStepId, index) => {
        state.workflowDiagramById[workflow.id][index] ||= [];
        const flowStep = flowSteps[flowStepId];

        // append unique input objects for diagram
        const inputsByNodeId = Object.keys(flowStep.inputIdsByNodeId).reduce((acc, nodeId) => {
          acc[nodeId] = flowStep.inputIdsByNodeId[nodeId].map((inputId) => {
            const diagramId = buildIODiagramId(flowStepId, nodeId, inputId);
            return {
              inputId,
              diagramId,
            };
          });
          return acc;
        }, {});

        // append unique output objects for diagram
        const outputsByNodeId = Object.keys(flowStep.outputIdsByNodeId).reduce((acc, nodeId) => {
          acc[nodeId] = flowStep.outputIdsByNodeId[nodeId].map((outputId) => {
            const diagramId = buildIODiagramId(flowStepId, nodeId, outputId);
            return {
              outputId,
              diagramId,
            };
          });
          return acc;
        }, {});

        state.workflowDiagramById[workflow.id][index].push({
          flowStepId,
          flowId,
          nodeId: buildDiagramNodeId(flowStepId, flowStep.nodeId),
          inputsByNodeId,
          outputsByNodeId,
        });
      });
    });
  },
};
