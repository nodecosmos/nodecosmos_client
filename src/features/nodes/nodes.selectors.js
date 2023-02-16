import { createSelector } from '@reduxjs/toolkit';

export const selectNodesById = (state) => state.nodes.byId;
export const selectChildIdsByRootAndParentId = (state) => state.nodes.childIdsByRootAndParentId;

export const selectNode = (nodeId) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[nodeId],
);

export const selectNodeAttribute = (nodeId, attribute) => createSelector(
  selectNodesById,
  (nodesById) => nodeId && nodesById[nodeId][attribute],
);

export const selectChildIdsByParentId = (rootId) => createSelector(
  selectChildIdsByRootAndParentId,
  (childIdsByRootAndParentId) => childIdsByRootAndParentId[rootId],
);
