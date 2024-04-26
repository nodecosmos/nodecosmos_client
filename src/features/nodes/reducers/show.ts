import { UUID } from '../../../types';
import { showBranchNode, showNode } from '../nodes.thunks';
import { NodeId, NodeState } from '../nodes.types';

export default function showFulfilled(
    state: NodeState,
    action: ReturnType<typeof showNode.fulfilled | typeof showBranchNode.fulfilled>,
) {
    const { node, descendants } = action.payload;
    const {
        branchId: currentBranchId, id, isPublic, owner,
    } = node;
    const isMainBranch = currentBranchId === id;

    const stateNode = state.byBranchId[currentBranchId]?.[id] || {};

    // init state for branch
    state.childIds[currentBranchId] ||= {};
    state.titles[currentBranchId] ||= {};
    state.byBranchId[currentBranchId] = {};

    state.byBranchId[currentBranchId][id] = {
        ...stateNode,
        ...node,
        ancestorIds: node.ancestorIds || [],
        treeRootId: id,
        isTmp: false,
        persistedId: id,
        isSelected: false,
    };

    state.titles[currentBranchId][id] = node.title;
    state.childIds[currentBranchId][id] = [];

    const childIds: Record<NodeId, NodeId[]> = {};
    childIds[id] ||= [];

    descendants.forEach((descendant) => {
        state.byBranchId[currentBranchId][descendant.id] = {
            ...descendant,
            treeRootId: id,
            branchId: isMainBranch ? descendant.id : currentBranchId,
            isTmp: false,
            isPublic,
            isRoot: false,
            persistedId: descendant.id,
            isSelected: false,
            ancestorIds: [],
            ownerId: null,
            ownerType: null,
            editorIds: [],
            createdAt: null,
            updatedAt: null,
            creatorId: null,
            coverImageUrl: null,
            coverImageFilename: null,
            owner,
            childIds: [],
        };

        childIds[descendant.parentId] ||= [];
        childIds[descendant.parentId].push(descendant.id);
        childIds[descendant.id] ||= [];

        state.titles[currentBranchId][descendant.id] = descendant.title;
    });

    for (const parentId in childIds) {
        state.byBranchId[currentBranchId][parentId].childIds = childIds[parentId];
    }

    state.childIds[currentBranchId] = childIds;

    updateAncestors(state, id, currentBranchId);
}

export function updateAncestors(state: NodeState, rootId: UUID, currentBranchId: UUID) {
    const childIds = state.childIds[currentBranchId];
    const stack: UUID[] = [rootId];

    while (stack.length) {
        const nodeId = stack.pop() as UUID;
        const node = state.byBranchId[currentBranchId][nodeId];

        const parent = state.byBranchId[currentBranchId][node.parentId];
        if (parent) {
            const parentAncestors = parent.ancestorIds || [];

            state.byBranchId[currentBranchId][nodeId].ancestorIds = [...parentAncestors, parent.id];
        }

        const nodeChildIds = childIds[nodeId];
        for (let i = 0; i < nodeChildIds.length; i += 1) {
            stack.push(nodeChildIds[i]);
        }
    }
}
