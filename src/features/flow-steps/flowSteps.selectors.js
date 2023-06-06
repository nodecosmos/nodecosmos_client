import { createSelector } from '@reduxjs/toolkit';

export const selectFlowStepsByWorkflowId = (state) => state.flowSteps.byWorkflowId;

export const selectWorkflowFlowSteps = (workflowId) => createSelector(
  selectFlowStepsByWorkflowId,
  (flowStepsByWorkflowId) => flowStepsByWorkflowId[workflowId],
);

export const selectWorkflowFlowStepIdsByFlowId = (workflowId) => createSelector(
  selectFlowStepsByWorkflowId,
  (flowStepsByWorkflowId) => flowStepsByWorkflowId[workflowId].reduce((acc, flowStepId) => {
    const flowStep = flowStepsByWorkflowId[flowStepId];
    acc[flowStep.flowId] ||= [];
    acc[flowStep.flowId].push(flowStepId);
    return acc;
  }, {}),
);
