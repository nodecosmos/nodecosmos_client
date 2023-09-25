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

    const flowStepLengths = workflow.flowIds.map((flowId) => flows[flowId]?.stepIds?.length || 0);
    const maxFlowStepLength = Math.max(...flowStepLengths);

    if (workflow.flowIds.length === 0) {
      buildEmptyWfStepPlaceholder(state, workflow);
    }

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

        // init following empty flow steps until the end of the workflow
        for (let i = emptyLastFlowStepIndex + 1; i <= maxFlowStepLength; i += 1) {
          initFlowForWfStep(state, workflow.id, i, flow.id, null, false);
        }
      } else {
        initFlowForWfStep(state, workflow.id, flow.startIndex, flow.id);
        for (let i = flow.startIndex + 1; i <= maxFlowStepLength; i += 1) {
          initFlowForWfStep(state, workflow.id, i, flow.id, null, false);
        }
      }
    });
  },
};

function initFlowForWfStep(state, workflowId, stepIndex, flowId, flowStep = null, shouldRender = true) {
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
    shouldRender,
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

function buildEmptyWfStepPlaceholder(state, workflow) {
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
