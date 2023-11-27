import { NodeState } from './nodes.types';
import { UUID } from '../../types';
import {
    COMPLETE_Y_LENGTH, EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP,
} from '../trees/trees.constants';

type NodeId = UUID;
type UpperSiblingId = UUID | null;
type LowerSiblingId = UUID | null;
type QueueItem = [NodeId, UpperSiblingId, LowerSiblingId];
type Queue = QueueItem[];

export function buildTree(state: NodeState, branchId: UUID, rootId: UUID) {
    const orderedTreeIds = [];

    const queue: Queue = [[rootId, null, null]];

    while (queue.length > 0) {
        const [currentId, upperSiblingId, lowerSiblingId] = queue.pop() as QueueItem;

        const currentNode = state.byBranchId[branchId][currentId];

        orderedTreeIds.push(currentId);

        const childIds = state.childIds[branchId][currentId] || [];
        state.byBranchId[branchId][currentId].childIds = childIds;

        // populate ancestor's descendantIds
        currentNode.ancestorIds.forEach((ancestorId) => {
            state.byBranchId[branchId][ancestorId].descendantIds.push(currentId);
        });

        if (upperSiblingId) {
            state.byBranchId[branchId][currentId].upperSiblingId = upperSiblingId;
        }

        if (lowerSiblingId) {
            state.byBranchId[branchId][currentId].lowerSiblingId = lowerSiblingId;
        }

        calculatePosition(state, branchId, currentId);

        // reversely populate ancestorIds
        for (let i = childIds.length - 1; i >= 0; i -= 1) {
            const childId = childIds[i];

            state.byBranchId[branchId][childId].ancestorIds = [...currentNode.ancestorIds, currentId];
            state.byBranchId[branchId][childId].nestedLevel = currentNode.ancestorIds.length + 1;

            const upperSiblingId = childIds[i - 1] || null;
            const lowerSiblingId = childIds[i + 1] || null;

            queue.push([childId, upperSiblingId, lowerSiblingId]);
        }
    }

    state.orderedTreeIds[branchId] = orderedTreeIds;
}

function calculatePosition(state: NodeState, branchId: UUID, id: UUID) {
    const node = state.byBranchId[branchId][id];

    const {
        upperSiblingId,
        parentId,
        ancestorIds,
        isRoot,
    } = node;

    const { x: parentX, y: parentY } = state.byBranchId[branchId][parentId];

    let upperSiblingYEnd = null;
    if (upperSiblingId) {
        upperSiblingYEnd = state.byBranchId[branchId][upperSiblingId].yEnd as number;
    }

    if (isRoot) {
        node.x = EDGE_LENGTH;
        node.y = EDGE_LENGTH + MARGIN_TOP;
    } else {
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
