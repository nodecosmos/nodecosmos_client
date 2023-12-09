import { UUID } from '../../../types';
import { showNode } from '../nodes.thunks';
import { NodeId, NodeState } from '../nodes.types';

export default function showFulfilled(
    state: NodeState,
    action: ReturnType<typeof showNode.fulfilled>,
) {
    const { node, descendants } = action.payload;
    const {
        branchId: treeBranchId, id, isPublic, owner,
    } = node;
    const isMainBranch = treeBranchId === id;

    // init state for branch
    state.byBranchId[treeBranchId] ||= {};
    state.childIds[treeBranchId] ||= {};
    state.titles[treeBranchId] ||= {};

    state.titles[treeBranchId][id] = node.title;
    const stateNode = state.byBranchId[treeBranchId][id] || {};
    node.ancestorIds ||= [];

    state.byBranchId[treeBranchId][id] = {
        ...stateNode,
        ...node,
        treeRootId: id,
        isTmp: false,
        persistedId: id,
        isSelected: true,
    };

    state.selected = {
        treeBranchId,
        branchId: node.branchId,
        id,
    };

    // tree data
    node.ancestorIds ||= [];
    state.childIds[treeBranchId][id] = [];

    const childIds: Record<NodeId, NodeId[]> = {};
    childIds[id] ||= [];

    descendants.forEach((descendant) => {
        const stateNode = state.byBranchId[treeBranchId][id] || {};

        state.byBranchId[treeBranchId][descendant.id] = {
            ...descendant,
            treeRootId: id,
            branchId: isMainBranch ? descendant.id : treeBranchId,
            description: stateNode.description || null,
            descriptionMarkdown: stateNode.descriptionMarkdown || null,
            shortDescription: stateNode.shortDescription || null,
            descriptionBase64: stateNode.descriptionBase64 || null,
            isTmp: false,
            isPublic,
            isRoot: false,
            persistedId: descendant.id,
            isSelected: false,
            ancestorIds: [],
            likesCount: 0,
            ownerId: null,
            ownerType: null,
            editorIds: [],
            createdAt: null,
            updatedAt: null,
            creatorId: null,
            coverImageURL: null,
            coverImageKey: null,
            owner,
            childIds: [],
        };

        childIds[descendant.parentId] ||= [];
        childIds[descendant.parentId].push(descendant.id);
        childIds[descendant.id] ||= [];

        state.titles[treeBranchId][descendant.id] = descendant.title;
    });

    for (const parentId in childIds) {
        state.byBranchId[treeBranchId][parentId].childIds = childIds[parentId];
    }

    state.childIds[treeBranchId] = childIds;

    updateAncestors(state, id, treeBranchId);
}

export function updateAncestors(state: NodeState, rootId: UUID, treeBranchId: UUID) {
    const childIds = state.childIds[treeBranchId];
    const stack: UUID[] = [rootId];

    while (stack.length) {
        const nodeId = stack.pop() as UUID;
        const node = state.byBranchId[treeBranchId][nodeId];

        const parent = state.byBranchId[treeBranchId][node.parentId];
        if (parent) {
            const parentAncestors = parent.ancestorIds || [];

            state.byBranchId[treeBranchId][nodeId].ancestorIds = [...parentAncestors, parent.id];
        }

        const nodeChildIds = childIds[nodeId];
        for (let i = 0; i < nodeChildIds.length; i += 1) {
            stack.push(nodeChildIds[i]);
        }
    }
}
