import { UUID } from '../../../types';
import { getLikesCount, likeObject } from '../../likes/likes.thunks';
import { NodeState } from '../nodes.types';

export function getLikesCountFulfilled(state: NodeState, action: ReturnType<typeof getLikesCount.fulfilled>) {
    const { id, likesCount } = action.payload;
    // currently only for main branch
    if (state.byBranchId[id] && state.byBranchId[id][id]) {
        state.byBranchId[id][id].likesCount = likesCount;
    }
}

export function likeObjectFulfilled(state: NodeState, action: ReturnType<typeof likeObject.fulfilled>) {
    const {
        id, likesCount, likedByCurrentUser,
    } = action.payload;
    handleLike(state, id, likesCount, likedByCurrentUser);
}

function handleLike(state: NodeState, id: UUID, likesCount: number, likedByCurrentUser: boolean) {
    if (state.byBranchId[id] && state.byBranchId[id][id]) {
        state.byBranchId[id][id].likesCount = likesCount as number;
        state.byBranchId[id][id].likedByCurrentUser = likedByCurrentUser;
    }

    if (state.indexNodesById[id]) {
        state.indexNodesById[id].likesCount = likesCount;
    }
}
