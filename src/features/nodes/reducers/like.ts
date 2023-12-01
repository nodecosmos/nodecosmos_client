import { UUID } from '../../../types';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { NodeState } from '../nodes.types';

export function getLikesCountFulfilled(state: NodeState, action: ReturnType<typeof getLikesCount.fulfilled>) {
    const {
        id, branchId, likesCount,
    } = action.payload;
    // currently only for main branch
    if (state.byBranchId[branchId] && state.byBranchId[branchId][id]) {
        state.byBranchId[branchId][id].likesCount = likesCount;
    }
}

export function likeObjectFulfilled(state: NodeState, action: ReturnType<typeof likeObject.fulfilled>) {
    const {
        id, branchId, likesCount,
    } = action.payload;
    handleLike(state, id, branchId, likesCount);
}

export function unlikeObjectFulfilled(state: NodeState, action: ReturnType<typeof unlikeObject.fulfilled>) {
    const {
        id, branchId, likesCount,
    } = action.payload;
    handleLike(state, id, branchId, likesCount);
}

function handleLike(state: NodeState, id: UUID, branchId: UUID, likesCount: number) {
    if (state.byBranchId[branchId] && state.byBranchId[branchId][id]) {
        state.byBranchId[branchId][id].likesCount = likesCount as number;
    }

    if (state.indexNodesById[id]) {
        state.indexNodesById[id].likesCount = likesCount;
    }
}
