import { createSelector } from '@reduxjs/toolkit';
import { extractRootIdFromTreeNodeId } from './trees.memoize';

// top level selectors
export const selectTreesByRootNodeId = (state) => state.trees.byRootNodeId;
export const selectPositionsByRootIdAndTreeNodeId = (state) => state.trees.positionsByRootIdAndTreeNodeId;
export const selectSelectedTreeNodeId = (state) => state.trees.selectedTreeNodeId;
export const selectDragAndDrop = (state) => state.trees.dragAndDrop;
export const selectIsTreeLoading = (state) => state.trees.isTreeLoading;

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

export const selectPositions = (rootId) => createSelector(
    selectPositionsByRootIdAndTreeNodeId,
    (positionsByRootIdAndTreeNodeId) => positionsByRootIdAndTreeNodeId[rootId],
);

export const selectPosition = (rootNodeId, treeNodeId) => createSelector(
    selectPositionsByRootIdAndTreeNodeId,
    (positionsByRootIdAndTreeNodeId) => (
        positionsByRootIdAndTreeNodeId[rootNodeId] && positionsByRootIdAndTreeNodeId[rootNodeId][treeNodeId]
    ) || {},
);

export const selectSelectedTreeNode = createSelector(
    selectSelectedTreeNodeId,
    selectTreesByRootNodeId,
    (treeNodeId, treeNodesByRootNodeId) => {
        if (!treeNodeId) return { };

        const rootId = extractRootIdFromTreeNodeId(treeNodeId);
        return treeNodesByRootNodeId[rootId][treeNodeId];
    },
);
