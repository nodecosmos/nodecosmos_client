import { createSelector } from '@reduxjs/toolkit';
import { extractRootIdFromTreeNodeId } from './trees.memoize';

// top level selectors
export const selectTreesByRootNodeId = (state) => state.trees.byRootNodeId;
export const selectPositionsByNodeId = (state) => state.trees.positionsByNodeId;

// derived selectors
export const selectOrderedTreeNodeIdsByRootNodeId = (rootNodeId) => createSelector(
  (state) => state.trees.orderedTreeNodeIdsByRootNodeId,
  (orderedTreeNodeIdsByRootNodeId) => orderedTreeNodeIdsByRootNodeId[rootNodeId] || [],
);

export const selectTreeNodesByRootNodeId = (rootNodeId) => createSelector(
  selectTreesByRootNodeId,
  (treesByRootNodeId) => treesByRootNodeId[rootNodeId],
);

export const selectTreeNodeById = (treeNodeId) => createSelector(
  selectTreesByRootNodeId,
  (treeNodesByRootNodeId) => {
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);
    return treeNodesByRootNodeId[rootNodeId][treeNodeId];
  },
);

export const selectTreeNodeAttributeById = (treeNodeId, attribute) => createSelector(
  selectTreesByRootNodeId,
  (treeNodesByRootNodeId) => {
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);
    return treeNodesByRootNodeId[rootNodeId][treeNodeId][attribute];
  },
);

export const selectHasChildrenByNodeId = (treeNodeId) => createSelector(
  selectTreesByRootNodeId,
  (treeNodesByRootNodeId) => {
    const rootNodeId = extractRootIdFromTreeNodeId(treeNodeId);
    return treeNodesByRootNodeId[rootNodeId][treeNodeId].treeChildIds.length > 0;
  },
);

export const selectPositionByNodeId = (treeNodeId) => createSelector(
  selectPositionsByNodeId,
  (positionsByNodeId) => positionsByNodeId[treeNodeId] || {},
);
