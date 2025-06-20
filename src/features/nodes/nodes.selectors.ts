import { AppNode } from './nodes.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectNodesByBranchId = (state: RootState) => state.nodes.byBranchId;
export const selectIndexNodesById = (state: RootState) => state.nodes.indexNodesById;
export const selectSelected = (state: RootState) => state.nodes.selected;
export const selectTitles = (state: RootState) => state.nodes.titles;
export const selectDragAndDrop = (state: RootState) => state.nodes.dragAndDrop;
export const selectChildIds = (state: RootState) => state.nodes.childIds;
export const selectSaveInProgress = (state: RootState) => state.nodes.saveInProgress;
export const selectJustCreatedNodeId = (state: RootState) => state.nodes.justCreatedNodeId;
export const selectScrollTo = (state: RootState) => state.nodes.scrollTo;
export const selectExpandedNodes = (state: RootState) => state.nodes.expandedNodes;
export const selectScale = (state: RootState) => state.nodes.scale;
export const selectDensity = (state: RootState) => state.nodes.treeDensity;
export const selectShowAncestorChain = (state: RootState) => state.nodes.showAncestorChain;
export const selectShowTreeColors = (state: RootState) => state.nodes.showTreeColors;
export const selectIndexSearchTerm = (state: RootState) => state.nodes.indexSearchTerm;
export const selectSidebarOpen = (state: RootState) => state.nodes.sidebarOpen;
export const selectNodesByOwnerId = (state: RootState) => state.nodes.byOwnerId;
export const selectNodesByEditorId = (state: RootState) => state.nodes.byEditorId;
export const selectRecentNodes = (state: RootState) => state.nodes.recentNodes;

export const selectBranchNodes = (branchId: UUID) => createSelector(
    selectNodesByBranchId,
    (nodesByBranchId) => nodesByBranchId[branchId],
);

export const selectNode = (branchId: UUID, nodeId: UUID) => createSelector(
    selectBranchNodes(branchId),
    (branchNodes) => {
        return branchNodes[nodeId];
    },
);

export const maybeSelectNode = (branchId: UUID, nodeId?: UUID) => createSelector(
    selectBranchNodes(branchId),
    (branchNodes) => {
        if (nodeId && branchNodes) {
            return branchNodes[nodeId];
        }
        return null;
    },
);

export const selectNodesByIds = (branchId: UUID, nodeIds: Set<UUID>) => createSelector(
    selectBranchNodes(branchId),
    (branchNodes) => {
        if (!branchNodes) {
            return [];
        }

        return Array.from(nodeIds).reduce((acc: AppNode[], id) => {
            const node = branchNodes[id];
            if (node) acc.push(node);
            return acc;
        }, []);
    },
);

export const selectIndexedNode = (nodeId: UUID) => createSelector(
    selectIndexNodesById,
    (indexedNodesById) => indexedNodesById[nodeId],
);

export const selectSelectedNode = createSelector(
    selectSelected,
    selectNodesByBranchId,
    (selected, nodesByBranchId) => {
        if (!selected) {
            return {} as AppNode;
        }
        const { branchId, id } = selected;
        return nodesByBranchId[branchId]?.[id] || {} as AppNode;
    },
);

export const selectBranchTitles = (branchId?: UUID) => createSelector(
    selectTitles,
    (titles) => branchId && titles[branchId],
);

export const selectBranchChildIds = (branchId?: UUID) => createSelector(
    selectChildIds,
    (childIds) => branchId && childIds[branchId],
);

export const selectNodesByOwner = (ownerId: UUID) => createSelector(
    selectNodesByOwnerId,
    (nodesByOwnerId) => nodesByOwnerId[ownerId],
);

export const selectNodesByEditor = (editorId: UUID) => createSelector(
    selectNodesByEditorId,
    (nodesByEditorId) => nodesByEditorId[editorId],
);
