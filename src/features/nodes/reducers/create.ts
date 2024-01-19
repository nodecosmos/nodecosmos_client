import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const { id, branchId } = action.payload;
    const { tmpId, treeBranchId } = action.meta.arg;

    if (tmpId && treeBranchId) {
        const tmpNode = state.byBranchId[treeBranchId][tmpId];
        state.byBranchId[treeBranchId][id] = {
            ...tmpNode,
            ...action.payload,
            persistedId: id,
            isCreationInProgress: false,
            isJustCreated: true,
            isTmp: false,
            isEditing: false,
        };
        // update node state
        state.titles[treeBranchId][id] = tmpNode.title;
        state.childIds[treeBranchId][id] = [];

        tmpNode.persistedId = id;
        tmpNode.branchId = branchId;
        state.justCreatedNodeId = id;
    }
}
