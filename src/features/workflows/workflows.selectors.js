import { createSelector } from '@reduxjs/toolkit';

export const selectWorkflowsById = (state) => state.workflows.byId;
export const selectWorkflowIdsByNodeId = (state) => state.workflows.idsByNodeId;
/* diagram */
export const selectWorkflowDiagramById = (state) => state.workflows.workflowDiagramById;
export const selectWorkflowDiagramPositionById = (state) => state.workflows.workflowDiagramPositionsById;

export const selectWorkflowsByNodeId = (nodeId) => createSelector([
  selectWorkflowIdsByNodeId,
  selectWorkflowsById,
], (workflowIdsByNodeId, workflowsById) => {
  const workflowIds = workflowIdsByNodeId[nodeId] || [];
  return workflowIds.map((workflowId) => workflowsById[workflowId]);
});

export const selectWorkflowDiagram = (workflowId) => createSelector(
  selectWorkflowDiagramById,
  (workflowDiagramById) => workflowDiagramById[workflowId] || [],
);

export const selectWorkflowDiagramPosition = (diagramId) => createSelector(
  selectWorkflowDiagramPositionById,
  (workflowDiagramPositionById) => workflowDiagramPositionById[diagramId] || {},
);
