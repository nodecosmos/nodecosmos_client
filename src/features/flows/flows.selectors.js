import { createSelector } from '@reduxjs/toolkit';

export const selectFlowsByWorkflowId = (state) => state.flows.byWorkflowId;

export const selectWorkflowFlows = (workflowId) => createSelector(
  selectFlowsByWorkflowId,
  (flowsByWorkflowId) => flowsByWorkflowId[workflowId],
);
