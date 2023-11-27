import { AppNode, NodeState } from './nodes.types';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

interface State { nodes: NodeState; }

export const selectNodesByBranchId = (state: State) => state.nodes.byBranchId;
export const selectIndexNodesById = (state: State) => state.nodes.indexNodesById;
export const selectSelectedNodePrimaryKey = (state: State) => state.nodes.selectedNodePrimaryKey;
export const selectTitles = (state: State) => state.nodes.titles;
export const selectNodePaneContent = (state: State) => state.nodes.nodePaneContent;

export const selectNode = (branchId: UUID, nodeId: UUID) => createSelector(
    selectNodesByBranchId,
    (nodesByBranchId) => nodesByBranchId[branchId]?.[nodeId],
);

export const selectIndexedNode = (nodeId: UUID) => createSelector(
    selectIndexNodesById,
    (indexedNodesById) => indexedNodesById[nodeId],
);

export const selectSelectedNode = createSelector(
    selectSelectedNodePrimaryKey,
    selectNodesByBranchId,
    (selectedNodePrimaryKey, nodesByBranchId) => {
        if (!selectedNodePrimaryKey) {
            return null;
        }
        const { branchId, id } = selectedNodePrimaryKey;
        return nodesByBranchId[branchId]?.[id];
    },
);

export const selectNodeAttribute = <K extends keyof AppNode>(
    branchId: UUID,
    nodeId: UUID,
    attribute: K,
) => createSelector(
        selectNode(branchId, nodeId),
        (node) => node && node[attribute],
    );

export const selectBranchTitles = (branchId?: UUID) => createSelector(
    selectTitles,
    (titles) => branchId && titles[branchId],
);
