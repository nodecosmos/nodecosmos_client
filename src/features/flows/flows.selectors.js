import { createSelector } from '@reduxjs/toolkit';

export const selectFlowsByWorkflowId = (state) => state.flows.byWorkflowId;

export const selectWorkflowFlows = (workflowId) => createSelector(
  selectFlowsByWorkflowId,
  (flowsByWorkflowId) => flowsByWorkflowId[workflowId],
);

export const selectFlow = (workflowId, flowId) => createSelector(
  selectWorkflowFlows(workflowId),
  (flows) => flows[flowId],
);

export const selectFlowAttribute = (workflowId, flowId, attribute) => createSelector(
  selectFlow(workflowId, flowId),
  (flow) => flow[attribute],
);
