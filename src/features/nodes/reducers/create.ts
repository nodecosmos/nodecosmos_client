import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const { id, branchId } = action.payload;
    const { tmpId } = action.meta.arg;

    if (tmpId && branchId) {
        const tmpNode = state.byBranchId[branchId][tmpId];
        state.byBranchId[branchId][id] = {
            ...tmpNode,
            ...action.payload,
            persistedId: id,
            isCreationInProgress: false,
            isTmp: false,
            isEditing: false,
        };
        // update node state
        state.titles[branchId][id] = tmpNode.title;
        state.childIds[branchId][id] = [];

        tmpNode.persistedId = id;
        tmpNode.branchId = branchId;
        state.justCreatedNodeId = id;
    }
}
