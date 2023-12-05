import { showNode } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

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
        isTemp: false,
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

    const childIds: NodeState['childIds'] = {};

    descendants.forEach((descendant) => {
        const stateNode = state.byBranchId[treeBranchId][id] || {};

        state.byBranchId[treeBranchId][descendant.id] = {
            ...descendant,
            branchId: isMainBranch ? descendant.id : treeBranchId,
            description: stateNode.description,
            descriptionMarkdown: stateNode.descriptionMarkdown,
            shortDescription: stateNode.shortDescription,
            descriptionBase64: stateNode.descriptionBase64,
            isTemp: false,
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

        childIds[treeBranchId] ||= {};
        childIds[treeBranchId][descendant.parentId] ||= [];
        childIds[treeBranchId][descendant.parentId].push(descendant.id);
        childIds[treeBranchId][descendant.id] ||= [];

        state.titles[treeBranchId][descendant.id] = descendant.title;
    });

    for (const parentId in childIds[treeBranchId]) {
        state.byBranchId[treeBranchId][parentId].childIds = childIds[treeBranchId][parentId];
    }

    state.childIds[treeBranchId] = {
        ...state.childIds[treeBranchId],
        ...childIds[treeBranchId],
    };
}
