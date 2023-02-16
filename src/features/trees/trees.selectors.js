import { createSelector } from '@reduxjs/toolkit';
import { extractRootIdFromTreeNodeId } from './trees.memoize';

// top level selectors
export const selectTreesByRootNodeId = (state) => state.trees.byRootNodeId;
export const selectPositionsByNodeId = (state) => state.trees.positionsByNodeId;

// derived selectors
export const selectOrderedTreeNodeIds = (rootId) => createSelector(
  (state) => state.trees.orderedTreeNodeIdsByRootNodeId,
  (orderedTreeNodeIdsByRootNodeId) => orderedTreeNodeIdsByRootNodeId[rootId] || [],
);

export const selectTreeNodes = (rootId) => createSelector(
  selectTreesByRootNodeId,
  (treesByRootNodeId) => treesByRootNodeId[rootId],
);

export const selectTreeNode = (treeNodeId) => createSelector(
  selectTreesByRootNodeId,
  (treeNodesByRootNodeId) => {
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);
    return treeNodesByRootNodeId[rootId][treeNodeId];
  },
);

export const selectTreeNodeAttribute = (treeNodeId, attribute) => createSelector(
  selectTreesByRootNodeId,
  (treeNodesByRootNodeId) => {
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);
    return treeNodesByRootNodeId[rootId][treeNodeId][attribute];
  },
);

export const selectHasChildren = (treeNodeId) => createSelector(
  selectTreesByRootNodeId,
  (treeNodesByRootNodeId) => {
    const rootId = extractRootIdFromTreeNodeId(treeNodeId);
    return treeNodesByRootNodeId[rootId][treeNodeId].treeChildIds.length > 0;
  },
);

export const selectPosition = (treeNodeId) => createSelector(
  selectPositionsByNodeId,
  (positionsByNodeId) => positionsByNodeId[treeNodeId] || {},
);
