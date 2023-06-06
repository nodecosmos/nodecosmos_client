import {
  buildDiagramFlowId,
  buildDiagramNodeId,
  buildWorkflowStepDiagramId,
} from '../workflows.memoize';

export default {
  buildWorkflowDiagram: (state, action) => {
    const {
      workflow,
      flows,
      flowSteps,
    } = action.payload;

    state.workflowDiagramById[workflow.id] = {
      workflowSteps: [],
    };

    state.workflowDiagramById[workflow.id].initialInputIds = workflow.initialInputIds;

    const flowIds = [...workflow.flowIds];
    let stepIndex = 0;

    while (stepIndex < flowIds.length) {
      const flowId = flowIds[stepIndex];
      const flow = flows[flowId];

      if (flow.startIndex === stepIndex) {
        initFlowForWfStep(state, workflow.id, stepIndex, flow.id);

        // eslint-disable-next-line no-loop-func
        flow.stepIds && flow.stepIds.forEach((flowStepId, flowStepIndex) => {
          const flowStep = flowSteps[flowStepId];

          const nodes = buildFlowStepNodes(flowStep);
          const inputsByNodeId = buildFlowStepInputs(flowStep);

          const wfStepIndex = stepIndex + flowStepIndex;

          initFlowForWfStep(state, workflow.id, wfStepIndex, flow.id);

          state.workflowDiagramById[workflow.id].workflowSteps[wfStepIndex][flow.id].flowSteps.push({
            id: flowStepId,
            workflowId: workflow.id,
            flowId: flow.id,
            nodes,
            nodeIds: flowStep.nodeIds,
            inputsByNodeId,
            outputIdsByNodeId: flowStep.outputIdsByNodeId,
          });
        });
      }

      stepIndex += 1;
    }

    for (let i = flowIds.length; i < (Math.max(10, flowIds.length + 1)); i += 1) {
      const lastIndex = state.workflowDiagramById[workflow.id].workflowSteps.length;

      state.workflowDiagramById[workflow.id].workflowSteps.push(
        {
          diagramId: buildWorkflowStepDiagramId(workflow.id, lastIndex),
          workflowId: workflow.id,
          index: lastIndex,
          flow: {},
        },
      );
    }
  },
};

function initFlowForWfStep(state, workflowId, stepIndex, flowId) {
  state.workflowDiagramById[workflowId].workflowSteps[stepIndex] ||= {
    workflowId,
    index: stepIndex,
    diagramId: buildWorkflowStepDiagramId(workflowId, stepIndex),
    flows: [{
      id: flowId,
      workflowId,
      diagramId: buildDiagramFlowId(stepIndex, flowId),
      flowSteps: [],
    }],
  };
}

function buildFlowStepNodes(flowStep) {
  return flowStep.nodeIds.map((nodeId) => {
    const diagramId = buildDiagramNodeId(flowStep.id, nodeId);
    return {
      id: nodeId,
      diagramId,
    };
  });
}

function buildFlowStepInputs(flowStep) {
  return Object.keys(flowStep.inputIdsByNodeId).reduce((acc, nodeId) => {
    const nodeDiagramId = buildDiagramNodeId(flowStep.id, nodeId);

    acc[nodeId] = flowStep.inputIdsByNodeId[nodeId].map((inputId) => ({
      id: inputId,
      nodeDiagramId,
    }));
    return acc;
  }, {});
}
