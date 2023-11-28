import { createNode } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof createNode.fulfilled>) {
    const { id, rootId } = action.payload;
    const { tmpNodeId, treeBranchId } = action.meta.arg;

    if (tmpNodeId && treeBranchId) {
        const tmpNode = state.byBranchId[treeBranchId][tmpNodeId];

        const newNode = action.payload;
        state.byBranchId[treeBranchId][id] = {
            ...newNode,
            persistedId: id,
            isTemp: false,
            isSelected: true,
            treeRootId: id,
            descendantIds: [],
            childIds: [],
            nestedLevel: tmpNode.nestedLevel || 0,
            likedByCurrentUser: null,
            x: 0,
            xEnd: 0,
            y: 0,
            yEnd: 0,
        };

        state.titles[treeBranchId][id] = action.payload.title;
        state.childIds[treeBranchId][id] = [];

        if (tmpNode) {
            state.byBranchId[treeBranchId][tmpNodeId].rootId = rootId;
            state.byBranchId[treeBranchId][tmpNodeId].persistedId = id;
        }
    }
}
