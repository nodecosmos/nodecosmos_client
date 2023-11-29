import { buildTree } from './tree';
import { showNode } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function showFulfilled(
    state: NodeState,
    action: ReturnType<typeof showNode.fulfilled>,
) {
    const { node, descendants } = action.payload;
    const { branchId, id, isPublic, owner } = node;
    const isMainBranch = branchId === id;

    // init state for branch
    state.byBranchId[branchId] ||= {};
    state.childIds[branchId] ||= {};
    state.titles[branchId] ||= {};

    state.titles[branchId][id] = node.title;
    const stateNode = state.byBranchId[branchId][id] || {};

    state.byBranchId[branchId][id] = {
        ...stateNode,
        ...node,
        isTreeRoot: true,
        x: 0,
        xEnd: 0,
        y: 0,
        yEnd: 0,
        ancestorIds: [],
        isTemp: false,
        persistedId: id,
        nestedLevel: node.isRoot ? 0 : node.ancestorIds.length,
        isSelected: true,
        treeRootId: id,
        descendantIds: [],
        childIds: [],
        likedByCurrentUser: null,
    };

    state.selected = {
        treeBranchId: branchId,
        id,
    };

    // tree data
    node.ancestorIds ||= [];
    state.childIds[branchId][id] = [];

    const childIds: NodeState['childIds'] = {};

    descendants.forEach((descendant) => {
        const stateNode = state.byBranchId[branchId][id] || {};

        state.byBranchId[branchId][descendant.id] = {
            ...descendant,
            branchId: isMainBranch ? descendant.id : branchId,
            description: stateNode.description,
            descriptionMarkdown: stateNode.descriptionMarkdown,
            shortDescription: stateNode.shortDescription,
            descriptionBase64: stateNode.descriptionBase64,
            isTemp: false,
            isPublic,
            isRoot: false,
            persistedId: descendant.id,
            nestedLevel: 0,
            isTreeRoot: false,
            isSelected: false,
            ancestorIds: [],
            treeRootId: id,
            descendantIds: [],
            childIds: [],
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
            likedByCurrentUser: null,
            x: 0,
            xEnd: 0,
            y: 0,
            yEnd: 0,
        };

        childIds[branchId] ||= {};
        childIds[branchId][descendant.parentId] ||= [];
        childIds[branchId][descendant.parentId].push(descendant.id);
        childIds[branchId][descendant.id] ||= [];

        state.titles[branchId][descendant.id] = descendant.title;
    });

    state.childIds[branchId] = {
        ...state.childIds[branchId],
        ...childIds[branchId],
    };

    buildTree(state, branchId, id);
}
