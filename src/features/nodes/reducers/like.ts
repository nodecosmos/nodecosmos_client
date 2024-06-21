import { UUID } from '../../../types';
import {
    getLikeCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { NodeState } from '../nodes.types';

export function getLikeCountFulfilled(state: NodeState, action: ReturnType<typeof getLikeCount.fulfilled>) {
    const { branchId } = action.meta.arg;

    const { id, likeCount } = action.payload;

    if (branchId) {
        state.byBranchId[branchId][id].likeCount = likeCount;
    }
}

export function likeObjectFulfilled(state: NodeState, action: ReturnType<typeof likeObject.fulfilled>) {
    const { id, branchId } = action.payload;

    handleLike(state, id, branchId, 1);
}

export function unlikeObjectFulfilled(state: NodeState, action: ReturnType<typeof unlikeObject.fulfilled>) {
    const { id, branchId } = action.payload;

    handleLike(state, id, branchId, -1);
}

function handleLike(state: NodeState, id: UUID, branchId: UUID, increment: number) {
    if (id === branchId && state.indexNodesById[id]) {
        state.indexNodesById[id].likeCount += increment;
    }

    if (branchId && state.byBranchId[branchId] && state.byBranchId[branchId][id]) {
        const likeCount = state.byBranchId[branchId][id].likeCount || 0;
        state.byBranchId[branchId][id].likeCount = likeCount + increment;
    }
}
