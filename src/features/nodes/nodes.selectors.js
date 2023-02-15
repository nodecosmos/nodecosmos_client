import { createSelector } from '@reduxjs/toolkit';

export const selectNodesById = (state) => state.nodes.byId;

export const selectNodeById = (nodeId) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[nodeId],
);

export const selectNodeAttributeById = (nodeId, attribute) => createSelector(
  selectNodesById,
  (nodesById) => nodeId && nodesById[nodeId][attribute],
);
