import { UUID } from '../../../types';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { NodeState } from '../nodes.types';

export function getLikesCountFulfilled(state: NodeState, action: ReturnType<typeof getLikesCount.fulfilled>) {
    const { currentBranchId } = action.meta.arg;

    const { id, likesCount } = action.payload;

    if (currentBranchId) {
        state.byBranchId[currentBranchId][id].likesCount = likesCount;
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
        const likesCount = state.byBranchId[currentBranchId][id].likesCount || 0;
        state.byBranchId[currentBranchId][id].likesCount = likesCount + increment;
    }

    if (id === branchId && state.indexNodesById[id]) {
        state.indexNodesById[id].likesCount += increment;
    }
}
