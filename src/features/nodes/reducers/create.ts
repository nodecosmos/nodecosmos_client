import { createNode } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof createNode.fulfilled>) {
    const {
        branchId, id, rootId,
    } = action.payload;
    const { tmpNodeId } = action.meta.arg;

    if (tmpNodeId) {
        const tmpNode = state.byBranchId[branchId][tmpNodeId];

        const newNode = action.payload;
        state.byBranchId[branchId][id] = {
            ...newNode,
            persistentId: id,
            isTemp: false,
            isSelected: true,
            treeRootId: id,
            descendantIds: [],
            childIds: [],
            nestedLevel: tmpNode.nestedLevel || 0,
            likedByCurrentUser: null,
            x: 0, xEnd: 0, y: 0, yEnd: 0,
        };

        state.titles[branchId][id] = action.payload.title;
        state.childIds[branchId][id] = [];

        if (tmpNode) {
            state.byBranchId[branchId][tmpNodeId].rootId = rootId;
            state.byBranchId[branchId][tmpNodeId].persistentId = id;
        }
    }
}
