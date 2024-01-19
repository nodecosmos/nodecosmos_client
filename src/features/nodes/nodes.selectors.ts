import { AppNode } from './nodes.types';
import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectNodesByBranchId = (state: RootState) => state.nodes.byBranchId;
export const selectIndexNodesById = (state: RootState) => state.nodes.indexNodesById;
export const selectSelected = (state: RootState) => state.nodes.selected;
export const selectTitles = (state: RootState) => state.nodes.titles;
export const selectNodePaneContent = (state: RootState) => state.nodes.nodePaneContent;
export const selectDragAndDrop = (state: RootState) => state.nodes.dragAndDrop;
export const selectChildIds = (state: RootState) => state.nodes.childIds;
export const selectSaveInProgress = (state: RootState) => state.nodes.saveInProgress;
export const selectPositions = (state: RootState) => state.nodes.positions;
export const selectJustCreatedNodeId = (state: RootState) => state.nodes.justCreatedNodeId;

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

export const selectBranchPositions = (branchId: UUID) => createSelector(
    selectPositions,
    (positions) => positions[branchId],
);

export const selectPosition = (branchId: UUID, nodeId: UUID) => createSelector(
    selectBranchPositions(branchId),
    (branchPositions) => branchPositions[nodeId],
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
        const { treeBranchId, id } = selected;
        return nodesByBranchId[treeBranchId]?.[id] || {} as AppNode;
    },
);

export const selectNodeAttribute = <K extends keyof AppNode>(
    branchId: UUID,
    nodeId: UUID,
    attribute: K,
) => createSelector(
        selectNodesByBranchId,
        (nodesByBranchId) => {
            const branchNodes = nodesByBranchId[branchId];
            if (!branchNodes) {
                return null;
            }

            const node = branchNodes[nodeId];
            if (!node) {
                return null;
            }

            return node[attribute];
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
