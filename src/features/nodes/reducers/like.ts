import { UUID } from '../../../types';
import {
    getlikeCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { NodeState } from '../nodes.types';

export function getlikeCountFulfilled(state: NodeState, action: ReturnType<typeof getlikeCount.fulfilled>) {
    const { currentBranchId } = action.meta.arg;

    const { id, likeCount } = action.payload;

    if (currentBranchId) {
        state.byBranchId[currentBranchId][id].likeCount = likeCount;
    }
}

export function likeObjectFulfilled(state: NodeState, action: ReturnType<typeof likeObject.fulfilled>) {
    const { currentBranchId } = action.meta.arg;

    const { id, branchId } = action.payload;

    handleLike(state, id, branchId, 1, currentBranchId);
}

export function unlikeObjectFulfilled(state: NodeState, action: ReturnType<typeof unlikeObject.fulfilled>) {
    const { currentBranchId } = action.meta.arg;

    const { id, branchId } = action.payload;

    handleLike(state, id, branchId, -1, currentBranchId);
}

function handleLike(state: NodeState, id: UUID, branchId: UUID, increment: number, currentBranchId?: UUID) {
    if (currentBranchId) {
        const likeCount = state.byBranchId[currentBranchId][id].likeCount || 0;
        state.byBranchId[currentBranchId][id].likeCount = likeCount + increment;
    }

    if (id === branchId && state.indexNodesById[id]) {
        state.indexNodesById[id].likeCount += increment;
    }
}
