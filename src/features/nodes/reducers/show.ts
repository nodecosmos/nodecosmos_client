import { buildTree } from './tree';
import { showNode } from '../nodes.thunks';
import { AppNode, NodeState } from '../nodes.types';

export default function showFulfilled(
    state: NodeState,
    action: ReturnType<typeof showNode.fulfilled>,
) {
    const { node, descendants } = action.payload;
    const { branchId, id } = node;
    state.byBranchId[branchId] ||= {};
    state.childIds[branchId] ||= {};
    const stateNode = state.byBranchId[branchId][id] || {};

    const appNode: AppNode = {
        ...stateNode,
        ...node,
        ancestorIds: [],
        isTemp: false,
        persistentId: id,
        nestedLevel: node.isRoot ? 0 : node.ancestorIds.length,
        isSelected: true,
        treeRootId: id,
        descendantIds: [],
        childIds: [],
        likedByCurrentUser: null,
    };

    state.byBranchId[branchId][id] = appNode;
    state.selectedNodePrimaryKey = { branchId, id };

    // tree data
    node.ancestorIds ||= [];
    state.childIds[branchId][id] = [];

    const childIds: NodeState['childIds'] = {};

    descendants.forEach((descendant) => {
        const stateNode = state.byBranchId[branchId][id] || {};

        state.byBranchId[branchId][descendant.id] = {
            ...descendant,
            description: stateNode.description,
            descriptionMarkdown: stateNode.descriptionMarkdown,
            shortDescription: stateNode.shortDescription,
            descriptionBase64: stateNode.descriptionBase64,
            isTemp: false,
            isPublic: appNode.isPublic,
            isRoot: false,
            persistentId: descendant.id,
            nestedLevel: 0,
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
            owner: appNode.owner,
            likedByCurrentUser: null,
            x: 0, xEnd: 0, y: 0, yEnd: 0,
        };

        childIds[branchId] ||= {};
        childIds[branchId][descendant.parentId] ||= [];
        childIds[branchId][descendant.parentId].push(descendant.id);

        childIds[branchId][descendant.id] ||= [];
    });

    state.childIds[branchId] = {
        ...state.childIds[branchId],
        ...childIds[branchId],
    };

    buildTree(state, branchId, id);
}
