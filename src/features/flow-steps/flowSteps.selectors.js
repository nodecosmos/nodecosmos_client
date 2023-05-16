import { createSelector } from '@reduxjs/toolkit';

export const selectFlowStepsByWorkflowId = (state) => state.flowSteps.byWorkflowId;

export const selectWorkflowFlowSteps = (workflowId) => createSelector(
  selectFlowStepsByWorkflowId,
  (flowStepsByWorkflowId) => flowStepsByWorkflowId[workflowId],
);
