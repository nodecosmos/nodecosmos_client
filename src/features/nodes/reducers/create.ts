import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const { id, branchId } = action.payload;
    const { tmpId, currentBranchId } = action.meta.arg;

    if (tmpId && currentBranchId) {
        const tmpNode = state.byBranchId[currentBranchId][tmpId];
        state.byBranchId[currentBranchId][id] = {
            ...tmpNode,
            ...action.payload,
            persistedId: id,
            isCreationInProgress: false,
            isTmp: false,
            isEditing: false,
        };
        // update node state
        state.titles[currentBranchId][id] = tmpNode.title;
        state.childIds[currentBranchId][id] = [];

        tmpNode.persistedId = id;
        tmpNode.branchId = branchId;
        state.justCreatedNodeId = id;
    }
}
