import { Position, UUID } from '../../../types';
import {
    COMPLETE_Y_LENGTH,
    EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from '../nodes.constants';
import {
    AppNode, NodeId, NodeState, TreeNodeKey,
} from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

type UpperSiblingId = UUID | null;
type LowerSiblingId = UUID | null;
type SiblingIndex = number;
type QueueItem = [NodeId, UpperSiblingId, LowerSiblingId, SiblingIndex];
type Queue = QueueItem[];

// not a reducer for now
export function buildTree(state: NodeState, treeBranchId: UUID, rootId: UUID, setChildIds = true) {
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

        if (setChildIds) {
            currentNode.childIds = childIds;
        }

        currentNode.upperSiblingId = upperSiblingId;
        currentNode.lowerSiblingId = lowerSiblingId;
        currentNode.lastChildId = childIds[childIds.length - 1];
        currentNode.isMounted = isTreeRoot || (isParentMounted && isParentExpanded);
        currentNode.siblingIndex = siblingIndex;
        currentNode.treeIndex = treeIndex;
        currentNode.isTreeRoot = isTreeRoot;
        currentNode.descendantIds = [];

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

    calculatePositions(state, treeBranchId);
}

export function expandNode(state: NodeState, action: PayloadAction<TreeNodeKey>) {
    const { treeBranchId, id } = action.payload;

    const node = state.byBranchId[treeBranchId][id];

    if (node.isExpanded) return;

    node.isExpanded = true;

    if (node.childIds.length === 0) return;

    mountDescendants(state, treeBranchId, node);

    calculatePositions(state, treeBranchId);
}

export function collapseNode(state: NodeState, action: PayloadAction<TreeNodeKey>) {
    const { treeBranchId, id } = action.payload;

    const node = state.byBranchId[treeBranchId][id];

    node.isExpanded = false;

    if (node.childIds.length === 0) return;

    unmountDescendants(state, treeBranchId, node);

    calculatePositions(state, treeBranchId);
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

export function calculatePositions(state: NodeState, treeBranchId: UUID) {
    const ids = state.orderedTreeIds[treeBranchId];
    const branchPositions: Record<NodeId, Position> = {};

    for (let i = 0; i < ids.length; i += 1) {
        const id = ids[i];
        const node = state.byBranchId[treeBranchId][id];
        calculatePosition(branchPositions, node);
    }

    state.positions[treeBranchId] = branchPositions;
}

function calculatePosition(branchPositions: Record<NodeId, Position>, node: AppNode) {
    const {
        id,
        upperSiblingId,
        parentId,
        ancestorIds,
        isTreeRoot,
    } = node;

    let upperSiblingYEnd = null;
    if (upperSiblingId) {
        upperSiblingYEnd = branchPositions[upperSiblingId].yEnd as number;
    }

    let x, y;

    if (isTreeRoot) {
        x = EDGE_LENGTH;
        y = EDGE_LENGTH + MARGIN_TOP;
    } else {
        const { x: parentX, y: parentY } = branchPositions[parentId];

        x = parentX + MARGIN_LEFT + EDGE_LENGTH;
        y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
    }

    branchPositions[id] = {
        x,
        y,
        xEnd: x + EDGE_LENGTH,
        yEnd: y,
    };

    if (node.isMounted) {
        ancestorIds.forEach((ancestorId) => {
            if (branchPositions[ancestorId]) {
                branchPositions[ancestorId].yEnd += COMPLETE_Y_LENGTH;
            }
        });
    }
}
