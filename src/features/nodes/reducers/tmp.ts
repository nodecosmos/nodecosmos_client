import { buildTree } from './tree';
import { UUID } from '../../../types';
import { NodePrimaryKey, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

// redux action
export interface BuildTmpNodeAction extends NodePrimaryKey {
    treeBranchId: UUID;
    tmpId: UUID;
}

export function buildTmpNode(state: NodeState, action: PayloadAction<BuildTmpNodeAction>) {
    const {
        treeBranchId, tmpId, branchId, id,
    } = action.payload;

    const node = state.byBranchId[treeBranchId][id];

    // init tmp child for node
    state.byBranchId[treeBranchId][tmpId] = {
        id: tmpId,
        branchId,
        rootId: node.rootId,
        parentId: id,
        order: state.childIds[treeBranchId][id].length + 1,
        isPublic: node.isPublic,
        isRoot: false,
        title: '',
        ancestorIds: [id, ...node.ancestorIds],
        description: null,
        shortDescription: null,
        descriptionMarkdown: null,
        descriptionBase64: null,
        ownerId: node.ownerId,
        ownerType: node.ownerType,
        creatorId: node.creatorId,
        likesCount: 0,
        coverImageURL: null,
        coverImageKey: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        editorIds: [],
        owner: node.owner,
        persistedId: null,
        isTreeRoot: false,
        isTemp: true,
        isSelected: false,
        nestedLevel: node.nestedLevel + 1,
        descendantIds: [],
        childIds: [],
        likedByCurrentUser: null,
        treeRootId: node.treeRootId,
        x: 0,
        xEnd: 0,
        y: 0,
        yEnd: 0,
    };

    state.childIds[treeBranchId][id].push(tmpId);
    state.childIds[treeBranchId][tmpId] = [];

    state.currentTmpNode = tmpId;

    buildTree(state, treeBranchId, node.rootId);
}

export interface NodeReplacePayload {
    treeBranchId: UUID;
    branchId: UUID;
    tmpId: UUID;
    persistedId: UUID;
}

export function replaceTmpWithPersisted(state: NodeState, action: PayloadAction<NodeReplacePayload>) {
    const {
        treeBranchId, branchId, tmpId, persistedId,
    } = action.payload;
    const tmpNode = state.byBranchId[treeBranchId][tmpId];
    const { parentId } = tmpNode;

    // replace tmpId with persistedId within the childIds of the parent
    const tmpNodeSiblingIndex = tmpNode.siblingIndex as number;
    const parentChildIds = state.childIds[treeBranchId][parentId];

    parentChildIds.splice(tmpNodeSiblingIndex, 1, persistedId);
    state.byBranchId[treeBranchId][parentId].childIds = parentChildIds;

    // replace tmpId with persistedId within the tree
    const tmpNodeTreeIndex = tmpNode.treeIndex as number;
    state.orderedTreeIds[treeBranchId].splice(tmpNodeTreeIndex, 1, persistedId);

    if (tmpNode.isSelected) {
        state.selected = {
            treeBranchId,
            id: persistedId,
            branchId,
        };
    }

    if (state.currentTmpNode === tmpId) {
        state.currentTmpNode = null;
    }

    delete state.byBranchId[treeBranchId][tmpId];
    delete state.childIds[treeBranchId][tmpId];
    delete state.titles[treeBranchId][tmpId];
}
