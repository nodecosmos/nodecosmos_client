import { createSelector } from '@reduxjs/toolkit';

export const selectNodesById = (state) => state.nodes.byId;
export const selectIndexNodesById = (state) => state.nodes.indexNodesById;
export const selectChildIdsByParentId = (state) => state.nodes.childIdsByParentId;
export const selectSelectedNodeId = (state) => state.nodes.selectedNodeId;
export const selectNodeDetailsAction = (state) => state.nodes.nodePaneContent;
export const selectNodeTitlesById = (state) => state.nodes.nodeTitlesById;
export const selectNodeCreationInProgress = (state) => state.nodes.nodeCreationInProgress;

export const selectNode = (nodeId) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[nodeId] || {},
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

export const selectNodeAttribute = (nodeId, attribute) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[nodeId] && nodesById[nodeId][attribute],
);
