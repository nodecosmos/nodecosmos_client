import { UUID } from '../../../types';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { NodeState } from '../nodes.types';

export function getLikesCountFulfilled(state: NodeState, action: ReturnType<typeof getLikesCount.fulfilled>) {
    const { treeBranchId } = action.meta.arg;

    const { id, likesCount } = action.payload;

    if (treeBranchId) {
        state.byBranchId[treeBranchId][id].likesCount = likesCount;
    }
}

export function likeObjectFulfilled(state: NodeState, action: ReturnType<typeof likeObject.fulfilled>) {
    const { treeBranchId } = action.meta.arg;

    const { id, branchId } = action.payload;

    handleLike(state, id, branchId, 1, treeBranchId);
}

export function unlikeObjectFulfilled(state: NodeState, action: ReturnType<typeof unlikeObject.fulfilled>) {
    const { treeBranchId } = action.meta.arg;

    const { id, branchId } = action.payload;

    handleLike(state, id, branchId, -1, treeBranchId);
}

function handleLike(state: NodeState, id: UUID, branchId: UUID, increment: number, treeBranchId?: UUID) {
    if (treeBranchId) {
        const likesCount = state.byBranchId[treeBranchId][id].likesCount || 0;
        state.byBranchId[treeBranchId][id].likesCount = likesCount + increment;
    }

    if (id === branchId && state.indexNodesById[id]) {
        state.indexNodesById[id].likesCount += increment;
    }
}
