import { UUID } from '../../../types';
import {
    COMPLETE_Y_LENGTH,
    EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from '../constants';
import {
    AppNode, NodePrimaryKey, NodeState,
} from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

type NodeId = UUID;
type UpperSiblingId = UUID | null;
type LowerSiblingId = UUID | null;
type SiblingIndex = number;
type QueueItem = [NodeId, UpperSiblingId, LowerSiblingId, SiblingIndex];
type Queue = QueueItem[];

// not a reducer for now
export function buildTree(state: NodeState, branchId: UUID, rootId: UUID) {
    const orderedTreeIds = [];

    const queue: Queue = [[rootId, null, null, 0]];

    while (queue.length > 0) {
        const [currentId, upperSiblingId, lowerSiblingId, siblingIndex] = queue.pop() as QueueItem;
        const currentNode = state.byBranchId[branchId][currentId];
        const childIds = state.childIds[branchId][currentId] || [];

        orderedTreeIds.push(currentId);
        currentNode.childIds = childIds;

        // populate ancestor's descendantIds
        currentNode.ancestorIds.forEach((ancestorId) => {
            state.byBranchId[branchId][ancestorId].descendantIds.push(currentId);
        });

        if (upperSiblingId) {
            currentNode.upperSiblingId = upperSiblingId;
        }

        if (lowerSiblingId) {
            currentNode.lowerSiblingId = lowerSiblingId;
        }

        currentNode.lastChildId = childIds[childIds.length - 1];
        currentNode.siblingIndex = siblingIndex;

        calculatePosition(state, branchId, currentId);

        // reversely populate ancestorIds
        for (let i = childIds.length - 1; i >= 0; i -= 1) {
            const childId = childIds[i];

            state.byBranchId[branchId][childId].ancestorIds = [...currentNode.ancestorIds, currentId];
            state.byBranchId[branchId][childId].nestedLevel = currentNode.ancestorIds.length + 1;

            const upperSiblingId = childIds[i - 1] || null;
            const lowerSiblingId = childIds[i + 1] || null;

            queue.push([childId, upperSiblingId, lowerSiblingId, i]);
        }
    }

    state.orderedTreeIds[branchId] = orderedTreeIds;
}

export function expandNode(state: NodeState, action: PayloadAction<NodePrimaryKey>) {
    const { branchId, id } = action.payload;

    const node = state.byBranchId[branchId][id];

    node.isExpanded = true;

    mountDescendants(state, node);

    buildTree(state, branchId, node.rootId);
}

export function collapseNode(state: NodeState, action: PayloadAction<NodePrimaryKey>) {
    const { branchId, id } = action.payload;

    const node = state.byBranchId[branchId][id];

    node.isExpanded = false;

    unmountDescendants(state, node);

    buildTree(state, branchId, node.rootId);
}

function mountDescendants(state: NodeState, node: AppNode) {
    const { descendantIds, branchId } = node;

    descendantIds.forEach((id) => {
        const { ancestorIds } = state.byBranchId[branchId][id];

        // mount node if all ancestors are expanded
        state.byBranchId[branchId][id].isMounted = ancestorIds.every(
            (ancestorId) => state.byBranchId[branchId][ancestorId].isExpanded,
        );
    });
}

function unmountDescendants (state: NodeState, node: AppNode) {
    const { descendantIds, branchId } = node;

    descendantIds.forEach((id) => {
        state.byBranchId[branchId][id].isMounted = false;
    });
}

function calculatePosition(state: NodeState, branchId: UUID, id: UUID) {
    const node = state.byBranchId[branchId][id];

    const {
        upperSiblingId,
        parentId,
        ancestorIds,
        isRoot,
    } = node;

    let upperSiblingYEnd = null;
    if (upperSiblingId) {
        upperSiblingYEnd = state.byBranchId[branchId][upperSiblingId].yEnd as number;
    }

    if (isRoot) {
        node.x = EDGE_LENGTH;
        node.y = EDGE_LENGTH + MARGIN_TOP;
    } else {
        const { x: parentX, y: parentY } = state.byBranchId[branchId][parentId];

        node.x = parentX as number + MARGIN_LEFT + EDGE_LENGTH;
        node.y = (upperSiblingYEnd || parentY) + COMPLETE_Y_LENGTH;
    }

    node.xEnd = node.x + EDGE_LENGTH;
    node.yEnd = node.y;

    if (node.isMounted) {
        ancestorIds.forEach((ancestorId) => {
            state.byBranchId[branchId][ancestorId].yEnd += COMPLETE_Y_LENGTH;
        });
    }
}
