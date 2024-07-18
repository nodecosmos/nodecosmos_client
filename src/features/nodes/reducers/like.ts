import { UUID } from '../../../types';
import {
    getLikeCount, likeObject, unlikeObject,
} from '../../likes/likes.thunks';
import { NodeState } from '../nodes.types';

export function getLikeCountFulfilled(state: NodeState, action: ReturnType<typeof getLikeCount.fulfilled>) {
    const { branchId } = action.meta.arg;

    const { id, likeCount } = action.payload;

    if (branchId) {
        const node = state.byBranchId[branchId][id];

        if (node) {
            node.likeCount = likeCount || 0;
        }
    }
}

export function getLikeCountRejected(state: NodeState, action: ReturnType<typeof getLikeCount.rejected>) {
    const { objectId, branchId } = action.meta.arg;

    if (branchId) {
        const node = state.byBranchId[branchId][objectId];

        if (node) {
            node.likeCount ||= 0;
        }
    }
}

export function likeObjectFulfilled(state: NodeState, action: ReturnType<typeof likeObject.fulfilled>) {
    const { objectId, branchId } = action.meta.arg;

    handleLike(state, objectId, branchId, 1);
}

export function unlikeObjectFulfilled(state: NodeState, action: ReturnType<typeof unlikeObject.fulfilled>) {
    const { objectId, branchId } = action.meta.arg;

    handleLike(state, objectId, branchId, -1);
}

function handleLike(state: NodeState, id: UUID, branchId: UUID, increment: number) {
    if (id === branchId && state.indexNodesById[id]) {
        state.indexNodesById[id].likeCount += increment;
    }

    if (branchId && state.byBranchId[branchId] && state.byBranchId[branchId][id]) {
        const likeCount = state.byBranchId[branchId][id].likeCount || 0;

        if (state.byBranchId[branchId][id]) {
            state.byBranchId[branchId][id].likeCount = likeCount + increment;
        }
    }
}
