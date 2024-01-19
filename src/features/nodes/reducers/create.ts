import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const { id, branchId } = action.payload;
    const { tmpId, treeBranchId } = action.meta.arg;

    if (tmpId && treeBranchId) {
        const tmpNode = state.byBranchId[treeBranchId][tmpId];
        const newNode = {
            ...tmpNode,
            ...action.payload,
            persistedId: id,
            isJustCreated: true,
            isTmp: false,
            isEditing: false,
        };
        // update node state
        state.byBranchId[treeBranchId][id] = newNode;
        state.titles[treeBranchId][id] = newNode.title;
        state.childIds[treeBranchId][id] = [];

        tmpNode.persistedId = id;
        tmpNode.branchId = branchId;
        state.justCreatedNodeId = id;
    }
}
