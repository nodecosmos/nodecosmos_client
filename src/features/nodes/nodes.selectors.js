import { createSelector } from '@reduxjs/toolkit';

export const selectNodesById = (state) => state.nodes.byId;
export const selectNestedNodesByParentId = (state) => state.nodes.nestedNodesByParentId;
export const selectMountedTreeNodesById = (state) => state.nodes.mountedTreeNodesById;
export const selectExpandedTreeNodesById = (state) => state.nodes.expandedTreeNodesById;
export const selectPositionsById = (state) => state.nodes.positionsById;
export const selectCurrentTmpNodeId = (state) => state.nodes.currentTempNodeId;

export const selectNodeById = (nodeId) => createSelector(
  selectNodesById,
  (nodesById) => nodesById[nodeId],
);

export const selectIsNodeMountedById = (nodeId) => createSelector(
  selectMountedTreeNodesById,
  (mountedTreeNodesById) => mountedTreeNodesById[nodeId],
);

export const selectIsNodeExpandedById = (nodeId) => createSelector(
  selectExpandedTreeNodesById,
  (expandedTreeNodesById) => expandedTreeNodesById[nodeId],
);

export const selectNodePositionById = (nodeId) => createSelector(
  selectPositionsById,
  (positionsById) => positionsById[nodeId] || {},
);

export const selectNodeAttributeById = (nodeId, attribute) => createSelector(
  selectNodesById,
  (nodesById) => nodeId && nodesById[nodeId][attribute],
);

export const areNestedNodesPresent = (nodeId) => createSelector(
  selectNestedNodesByParentId,
  (nestedNodesByParentId) => nestedNodesByParentId[nodeId].length > 0,
);
