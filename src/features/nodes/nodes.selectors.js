import { createSelector } from '@reduxjs/toolkit';

export const selectNodesById = (state) => state.nodes.byId;
export const selectIndexNodesById = (state) => state.nodes.indexNodesById;
export const selectChildIdsByRootAndParentId = (state) => state.nodes.childIdsByRootAndParentId;
export const selectSelectedNodeId = (state) => state.nodes.selectedNodeId;
export const selectNodeDetailsAction = (state) => state.nodes.nodeDetailsAction;

export const selectNode = (nodeId) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[nodeId],
);

export const selectIndexedNode = (nodeId) => createSelector(
  selectIndexNodesById,
  (indexedNodesById) => indexedNodesById[nodeId],
);

export const selectSelectedNode = createSelector(
  selectNodesById,
  selectSelectedNodeId,
  (nodesById, selectedNodeId) => nodesById[selectedNodeId] || {},
);

export const selectPersistentId = (stateId) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[stateId].id,
);

export const selectNodeAttribute = (nodeId, attribute) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[nodeId] && nodesById[nodeId][attribute],
);

export const selectChildIdsByParentId = (rootId) => createSelector(
  selectChildIdsByRootAndParentId,
  (childIdsByRootAndParentId) => childIdsByRootAndParentId[rootId],
);
