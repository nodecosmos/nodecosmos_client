import { UUID } from '../../../types';
import { showBranchNode, showNode } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function showFulfilled(
    state: NodeState,
    action: ReturnType<typeof showNode.fulfilled | typeof showBranchNode.fulfilled>,
) {
    const { node, descendants } = action.payload;
    const {
        branchId, id, isPublic, owner,
    } = node;

    const stateNode = state.byBranchId[branchId]?.[id] || {};

    // init state for branch
    state.childIds[branchId] ||= {};
    state.titles[branchId] ||= {};
    state.byBranchId[branchId] = {};

    state.byBranchId[branchId][id] = {
        ...stateNode,
        ...node,
        ancestorIds: node.ancestorIds || [],
        treeRootId: id,
        isTmp: false,
        persistedId: id,
        isSelected: false,
    };

    state.titles[branchId][id] = node.title;
    state.childIds[branchId][id] = [];

    const childIds: Record<UUID, UUID[]> = {};
    childIds[id] ||= [];

    descendants.forEach((descendant) => {
        state.byBranchId[branchId][descendant.id] = {
            ...descendant,
            treeRootId: id,
            branchId,
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

        state.titles[branchId][descendant.id] = descendant.title;
    });

    for (const parentId in childIds) {
        state.byBranchId[branchId][parentId].childIds = childIds[parentId];
    }

    state.childIds[branchId] = childIds;

    updateAncestors(state, id, branchId);
}

export function updateAncestors(state: NodeState, rootId: UUID, branchId: UUID) {
    const childIds = state.childIds[branchId];
    const stack: UUID[] = [rootId];

    while (stack.length) {
        const nodeId = stack.pop() as UUID;
        const node = state.byBranchId[branchId][nodeId];

        const parent = state.byBranchId[branchId][node.parentId];
        if (parent) {
            const parentAncestors = parent.ancestorIds || [];

            state.byBranchId[branchId][nodeId].ancestorIds = [...parentAncestors, parent.id];
        }

        const nodeChildIds = childIds[nodeId];
        for (let i = 0; i < nodeChildIds.length; i += 1) {
            stack.push(nodeChildIds[i]);
        }
    }
}
