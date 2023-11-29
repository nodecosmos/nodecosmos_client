import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const { id, parentId, branchId } = action.payload;
    const { tmpNodeId, treeBranchId } = action.meta.arg;

    if (tmpNodeId && treeBranchId) {
        const tmpNode = state.byBranchId[treeBranchId][tmpNodeId];

        const newNode = action.payload;
        state.byBranchId[treeBranchId][id] = {
            ...tmpNode,
            ...newNode,
            persistedId: id,
            isTemp: false,
        };

        state.titles[treeBranchId][id] = action.payload.title;
        state.childIds[treeBranchId][id] = [];

        // replace tmpId with persistedId within the childIds of the parent
        const tmpNodeSiblingIndex = tmpNode.siblingIndex as number;
        const parentChildIds = state.childIds[treeBranchId][parentId];

        parentChildIds.splice(tmpNodeSiblingIndex, 1, id);
        state.byBranchId[treeBranchId][parentId].childIds = parentChildIds;

        // replace tmpId with persistedId within the tree
        const tmpNodeTreeIndex = tmpNode.treeIndex as number;
        state.orderedTreeIds[treeBranchId].splice(tmpNodeTreeIndex, 1, id);

        if (tmpNode.isSelected) {
            state.selected = {
                treeBranchId,
                id,
                branchId,
            };
        }

        delete state.byBranchId[treeBranchId][tmpNodeId];
        delete state.childIds[treeBranchId][tmpNodeId];
        delete state.titles[treeBranchId][tmpNodeId];
    }
}
