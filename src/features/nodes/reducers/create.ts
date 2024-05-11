import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const {
        id, branchId, parentId,
    } = action.payload;
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
        // avoid double rendering as this will be added in `replaceTmpNodeWithPersisted`
        // state.childIds[branchId][id] = [];

        // check if any other branch contains same root and append node
        const rootId = tmpNode.rootId;
        const branchIds = Object.keys(state.byBranchId);
        for (const otherBranchId of branchIds) {
            if (otherBranchId === branchId) {
                continue;
            }

            if (state.byBranchId[otherBranchId][rootId]) {
                state.byBranchId[otherBranchId][id] = {
                    ...tmpNode,
                    ...action.payload,
                    branchId: otherBranchId,
                    persistedId: id,
                    isCreationInProgress: false,
                    isTmp: false,
                    isEditing: false,
                };

                state.titles[otherBranchId][id] = action.payload.title;
                state.childIds[otherBranchId][id] = [];
                state.childIds[otherBranchId][parentId].push(id);
            }
        }

        tmpNode.persistedId = id;
        tmpNode.branchId = branchId;
        state.justCreatedNodeId = id;
    }
}
