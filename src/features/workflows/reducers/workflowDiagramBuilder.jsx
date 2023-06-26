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
      initialInputIds: workflow.initialInputIds,
      workflowSteps: [],
      flowsCount: 0,
    };

    workflow.flowIds.forEach((flowId) => {
      const flow = flows[flowId];
      state.workflowDiagramById[workflow.id].flowsCount += 1;

      if (flow.stepIds && flow.stepIds.length > 0) {
        flow.stepIds.forEach((flowStepId, flowStepIndex) => {
          const flowStep = flowSteps[flowStepId];
          const nodes = buildFlowStepNodes(flowStep);
          const inputsByNodeId = buildFlowStepInputs(flowStep);
          const wfStepIndex = flow.startIndex + flowStepIndex;

          const diagramFlowStep = {
            id: flowStepId,
            workflowId: workflow.id,
            flowId: flow.id,
            nodes,
            nodeIds: flowStep.nodeIds,
            inputsByNodeId,
            outputIdsByNodeId: flowStep.outputIdsByNodeId,
            workflowStepIndex: wfStepIndex,
            flowStepIndex,
          };

          initFlowForWfStep(state, workflow.id, wfStepIndex, flow.id, diagramFlowStep);
        });

        const emptyLastFlowStepIndex = flow.startIndex + flow.stepIds.length;
        initFlowForWfStep(state, workflow.id, emptyLastFlowStepIndex, flow.id, null);
      } else {
        initFlowForWfStep(state, workflow.id, flow.startIndex, flow.id);
      }
    });

    buildEmptyWfStepPlaceholders(state, workflow);
  },
};

function initFlowForWfStep(state, workflowId, stepIndex, flowId, flowStep = null) {
  state.workflowDiagramById[workflowId].workflowSteps[stepIndex] ||= {
    workflowId,
    stepIndex,
    diagramId: buildWorkflowStepDiagramId(workflowId, stepIndex),
    wfStepFlows: [],
    wfStepOutputIds: [],
  };

  if (flowStep) {
    const { wfStepOutputIds } = state.workflowDiagramById[workflowId].workflowSteps[stepIndex];

    const flowStepOutputIds = Object.values(flowStep.outputIdsByNodeId).flat();

    state.workflowDiagramById[workflowId]
      .workflowSteps[stepIndex].wfStepOutputIds = [...wfStepOutputIds, ...flowStepOutputIds];
  }

  state.workflowDiagramById[workflowId].workflowSteps[stepIndex].wfStepFlows.push({
    id: flowId,
    workflowId,
    diagramId: buildDiagramFlowId(stepIndex, flowId),
    stepIndex,
    flowStep,
  });
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

function buildEmptyWfStepPlaceholders(state, workflow) {
  for (let i = workflow.flowIds.length; i <= (Math.max(9, workflow.flowIds.length + 1)); i += 1) {
    const lastIndex = state.workflowDiagramById[workflow.id].workflowSteps.length;

    state.workflowDiagramById[workflow.id].workflowSteps.push(
      {
        diagramId: buildWorkflowStepDiagramId(workflow.id, lastIndex),
        workflowId: workflow.id,
        stepIndex: lastIndex,
        wfStepFlows: [],
      },
    );
  }
}
