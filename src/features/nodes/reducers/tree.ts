import { UUID } from '../../../types';
import {
    CLIENT_VIEWPORT_BUFFER_FACTOR,
    COMPLETE_Y_LENGTH,
    EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from '../nodes.constants';
import {
    AppNode, NodeState, TreeNodeKey,
} from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

type NodeId = UUID;
type UpperSiblingId = UUID | null;
type LowerSiblingId = UUID | null;
type SiblingIndex = number;
type QueueItem = [NodeId, UpperSiblingId, LowerSiblingId, SiblingIndex];
type Queue = QueueItem[];

// not a reducer for now
export function buildTree(state: NodeState, treeBranchId: UUID, rootId: UUID) {
    const orderedTreeIds = [];

    const queue: Queue = [[rootId, null, null, 0]];

    let treeIndex = 0;
    while (queue.length > 0) {
        const [currentId, upperSiblingId, lowerSiblingId, siblingIndex] = queue.pop() as QueueItem;
        const currentNode = state.byBranchId[treeBranchId][currentId];
        const { parentId } = currentNode;
        const childIds = state.childIds[treeBranchId][currentId] || [];
        const isTreeRoot = rootId === currentId;

        orderedTreeIds.push(currentId);

        // populate ancestor's descendantIds
        currentNode.ancestorIds.forEach((ancestorId) => {
            const ancestor = state.byBranchId[treeBranchId][ancestorId];
            if (ancestor) {
                ancestor.descendantIds.push(currentId);
            }
        });

        let isParentExpanded = false;
        let isParentMounted = false;

        if (!isTreeRoot) {
            const parent = state.byBranchId[treeBranchId][parentId];
            isParentExpanded = parent.isExpanded as boolean;
            isParentMounted = parent.isMounted as boolean;
        }

        currentNode.childIds = childIds;
        currentNode.upperSiblingId = upperSiblingId;
        currentNode.lowerSiblingId = lowerSiblingId;
        currentNode.lastChildId = childIds[childIds.length - 1];
        currentNode.isMounted = isTreeRoot || (isParentMounted && isParentExpanded);
        currentNode.siblingIndex = siblingIndex;
        currentNode.treeIndex = treeIndex;
        currentNode.isTreeRoot = isTreeRoot;
        currentNode.render = true;
        currentNode.descendantIds = [];

        calculatePosition(state, treeBranchId, currentId);

        // reversely populate ancestorIds
        for (let i = childIds.length - 1; i >= 0; i -= 1) {
            const childId = childIds[i];
            const upperSiblingId = childIds[i - 1] || null;
            const lowerSiblingId = childIds[i + 1] || null;

            state.byBranchId[treeBranchId][childId].ancestorIds = [...currentNode.ancestorIds, currentId];
            state.byBranchId[treeBranchId][childId].nestedLevel = currentNode.ancestorIds.length + 1;

            queue.push([childId, upperSiblingId, lowerSiblingId, i]);
        }

        treeIndex += 1;
    }

    state.orderedTreeIds[treeBranchId] = orderedTreeIds;

    virtualizeNodes(state, treeBranchId);
}

export function expandNode(state: NodeState, action: PayloadAction<TreeNodeKey>) {
    const { treeBranchId, id } = action.payload;

    const node = state.byBranchId[treeBranchId][id];

    node.isExpanded = true;

    mountDescendants(state, treeBranchId, node);

    calculatePositions(state, treeBranchId);
    virtualizeNodes(state, treeBranchId);
}

export function collapseNode(state: NodeState, action: PayloadAction<TreeNodeKey>) {
    const { treeBranchId, id } = action.payload;

    const node = state.byBranchId[treeBranchId][id];

    node.isExpanded = false;

    unmountDescendants(state, treeBranchId, node);

    calculatePositions(state, treeBranchId);
    virtualizeNodes(state, treeBranchId);
}

export function virtualizeNodes(state: NodeState, treeBranchId: UUID) {
    const branchNodes = state.byBranchId[treeBranchId];
    const treeNodeIds = state.orderedTreeIds[treeBranchId];
    state._prevVisibleNodes[treeBranchId] ||= {};
    const prevVirtualizedNodesById = state._prevVisibleNodes[treeBranchId];

    state.visibleOrderedTreeIds[treeBranchId] = treeNodeIds?.filter((id) => {
        const {
            isMounted,
            parentId,
            isJustCreated,
        } = branchNodes[id];
        const parent = branchNodes[parentId];
        const isLastParentsChild = parent?.lastChildId === id;
        const isInViewport = isNodeInViewport(state, treeBranchId, id);

        if (isMounted && (isInViewport || isLastParentsChild)) {
            //  we don't animate nodes that are mounted but not in viewport
            branchNodes[id].render = true;
            branchNodes[id].alreadyMounted = isJustCreated || prevVirtualizedNodesById[id];
            prevVirtualizedNodesById[id] = true;

            // we render parent if any child is rendered
            if (parent && !parent.render) {
                parent.render = true;
                parent.alreadyMounted = isJustCreated || prevVirtualizedNodesById[parentId];
                prevVirtualizedNodesById[parentId] = true;
            }

            return true;
        } else {
            branchNodes[id].render = false;
            prevVirtualizedNodesById[id] = false;

            return false;
        }
    });
}

export function calculatePositions(state: NodeState, treeBranchId: UUID) {
    const ids = state.orderedTreeIds[treeBranchId];

    ids.forEach((id) => {
        calculatePosition(state, treeBranchId, id);
    });
}

function isNodeInViewport(state: NodeState, treeBranchId: UUID, id: UUID) {
    const { y } = state.byBranchId[treeBranchId][id];
    const {
        scrollTop,
        clientHeight,
    } = state._transformablePositionsById[treeBranchId];

    const bellowTop = y > (scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);
    const aboveBottom = y < (scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);

    return bellowTop && aboveBottom;
}

function mountDescendants(state: NodeState, treeBranchId: UUID, node: AppNode) {
    const { descendantIds } = node;

    descendantIds.forEach((id) => {
        // mount node if parent is mounted & expanded
        const parentId = state.byBranchId[treeBranchId][id].parentId;
        const { isMounted: isParentMounted, isExpanded: isParentExpanded } = state.byBranchId[treeBranchId][parentId];

        state.byBranchId[treeBranchId][id].isMounted = isParentMounted && isParentExpanded;
    });
}

function unmountDescendants (state: NodeState, treeBranchId: UUID, node: AppNode) {
    const { descendantIds } = node;

    descendantIds.forEach((id) => {
        state.byBranchId[treeBranchId][id].isMounted = false;
    });
}

function calculatePosition(state: NodeState, treeBranchId: UUID, id: UUID) {
    const node = state.byBranchId[treeBranchId][id];

    const {
        upperSiblingId,
        parentId,
        ancestorIds,
        isTreeRoot,
    } = node;

    let upperSiblingYEnd = null;
    if (upperSiblingId) {
        upperSiblingYEnd = state.byBranchId[treeBranchId][upperSiblingId].yEnd as number;
    }

    if (isTreeRoot) {
        node.x = EDGE_LENGTH;
        node.y = EDGE_LENGTH + MARGIN_TOP;
    } else {
        const { x: parentX, y: parentY } = state.byBranchId[treeBranchId][parentId];

        node.x = parentX as number + MARGIN_LEFT + EDGE_LENGTH;
        node.y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
    }

    node.xEnd = node.x + EDGE_LENGTH;
    node.yEnd = node.y;

    if (node.isMounted) {
        ancestorIds.forEach((ancestorId) => {
            if (state.byBranchId[treeBranchId][ancestorId]) {
                state.byBranchId[treeBranchId][ancestorId].yEnd += COMPLETE_Y_LENGTH;
            }
        });
    }
}
