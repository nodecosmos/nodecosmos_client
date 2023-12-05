import {
    AppNode, NodeId, NodeState,
} from './nodes.types';
import { UUID } from '../../types';
import { isYInViewport } from '../../utils/position';
import { selectTransformablePositionsById } from '../app/app.selectors';
import { createSelector } from '@reduxjs/toolkit';

interface State { nodes: NodeState; }

export const selectNodesByBranchId = (state: State) => state.nodes.byBranchId;
export const selectIndexNodesById = (state: State) => state.nodes.indexNodesById;
export const selectSelected = (state: State) => state.nodes.selected;
export const selectTitles = (state: State) => state.nodes.titles;
export const selectNodePaneContent = (state: State) => state.nodes.nodePaneContent;
export const selectDragAndDrop = (state: State) => state.nodes.dragAndDrop;
export const selectChildIds = (state: State) => state.nodes.childIds;
export const selectActionInProgress = (state: State) => state.nodes.actionInProgress;
export const selectOrderedTreeIds = (state: State) => state.nodes.orderedTreeIds;
export const selectPositions = (state: State) => state.nodes.positions;

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
        selectNode(branchId, nodeId),
        (node) => node && node[attribute],
    );

export const selectBranchTitles = (branchId?: UUID) => createSelector(
    selectTitles,
    (titles) => branchId && titles[branchId],
);

export const selectBranchChildIds = (branchId?: UUID) => createSelector(
    selectChildIds,
    (childIds) => branchId && childIds[branchId],
);

export const selectBranchOrderedTreeIds = (treeBranchId?: UUID) => createSelector(
    selectOrderedTreeIds,
    (orderedTreeIds) => treeBranchId && orderedTreeIds[treeBranchId],
);

// seems that having a selector instead of reducer improves performance
// as reading is done on raw state instead of proxy that is created by immer
export const selectVisibleNodes = (treeBranchId: UUID) => createSelector(
    selectBranchPositions(treeBranchId),
    selectBranchOrderedTreeIds(treeBranchId),
    selectTransformablePositionsById(treeBranchId),
    selectBranchNodes(treeBranchId),
    (branchPositions, treeNodeIds, transformablePositions, branchNodes): NodeId[] => {
        const visibleNodes = [];
        const alreadyRendered = new Set<NodeId>();

        if (!treeNodeIds) return [];

        for (let i = 0; i < treeNodeIds.length; i += 1) {
            const id = treeNodeIds[i];
            const node = branchNodes[id];
            const {
                isMounted,
                parentId,
            } = node;
            const { y } = branchPositions[id];
            const parent = branchNodes[parentId];
            const isInViewport = isYInViewport(y, transformablePositions);
            const isLastChild = parent?.lastChildId === id;

            if (isMounted && (isInViewport || isLastChild)) {
                alreadyRendered.add(id);

                // we render parent and its last child if any child is rendered
                if (parent && !alreadyRendered.has(parentId)) {
                    alreadyRendered.add(parentId);

                    visibleNodes.push(parentId);
                }

                visibleNodes.push(id);
            }
        }

        return visibleNodes;
    },
);
