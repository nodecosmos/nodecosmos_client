import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const { id, parentId } = action.payload;
    const { tmpNodeId, treeBranchId } = action.meta.arg;

    if (tmpNodeId && treeBranchId) {
        const tmpNode = state.byBranchId[treeBranchId][tmpNodeId];
        const newNode = {
            ...tmpNode,
            ...action.payload,
            persistedId: id,
            isJustCreated: true,
            isTmp: false,
        };
        const parentChildIds = state.childIds[treeBranchId][parentId];
        const siblingIndex = parentChildIds.indexOf(tmpNodeId);

        parentChildIds.splice(siblingIndex, 1, id);
        state.byBranchId[treeBranchId][parentId].childIds = parentChildIds;

        if (tmpNode.isSelected) {
            state.selected = {
                treeBranchId,
                branchId: newNode.branchId,
                id,
            };
        }

        // update node state
        state.byBranchId[treeBranchId][id] = newNode;
        state.titles[treeBranchId][id] = newNode.title;
        state.childIds[treeBranchId][id] = [];

        state.justCreatedNodeId = id;

        delete state.childIds[treeBranchId][tmpNodeId];
        delete state.titles[treeBranchId][tmpNodeId];
        // delete state.byBranchId[treeBranchId][tmpNodeId];
    }
}
