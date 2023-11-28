import { buildTree } from './tree';
import { UUID } from '../../../types';
import { NodePrimaryKey, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

// redux action
export interface BuildTmpNodeAction {
    tmpId: UUID;
    branchId: UUID;
    id: UUID;
}

export function buildTmpNode(state: NodeState, action: PayloadAction<BuildTmpNodeAction>) {
    const {
        tmpId, branchId, id,
    } = action.payload;

    const node = state.byBranchId[branchId][id];

    state.byBranchId[node.branchId][tmpId] = {
        id: tmpId,
        branchId: node.branchId,
        rootId: node.rootId,
        parentId: id,
        order: state.childIds[branchId][id].length + 1,
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

    state.childIds[branchId][id].push(tmpId);
    state.childIds[branchId][tmpId] = [];

    state.currentTmpNode = tmpId;

    buildTree(state, branchId, node.rootId);
}

export function clearTmp(state: NodeState, action: PayloadAction<NodePrimaryKey>) {
    const { branchId, id } = action.payload;
    const node = state.byBranchId[branchId][id];

    if (node && node.isTemp) {
        delete state.byBranchId[branchId][id];
        delete state.childIds[branchId][node.id];

        const parent = state.byBranchId[branchId][node.parentId];
        state.childIds[branchId][node.parentId] = state.childIds[branchId][node.parentId]
            .filter((childId) => childId !== id);
        state.byBranchId[branchId][parent.id].childIds = state.childIds[branchId][parent.id];
    }
}

export interface NodeReplacePayload {
    branchId: UUID;
    tmpId: UUID;
    persistedId: UUID;
}

export function replaceTmpWithPersisted(state: NodeState, action: PayloadAction<NodeReplacePayload>) {
    const {
        branchId, tmpId, persistedId,
    } = action.payload;
    const newNode = state.byBranchId[branchId][persistedId];
    const tmpNode = state.byBranchId[branchId][tmpId];
    const { parentId } = tmpNode;

    state.byBranchId[branchId][persistedId] = {
        ...newNode,
        id: persistedId,
        persistedId,
        isTemp: false,
        isSelected: tmpNode.isSelected,
        x: tmpNode.x,
        xEnd: tmpNode.xEnd,
        y: tmpNode.y,
        yEnd: tmpNode.yEnd,

    };

    if (tmpNode.isSelected) {
        state.selected = {
            id: persistedId,
            branchId, 
        };
    }

    // replace tmpId with persistedId within the childIds of the parent
    const parentChildIds = state.childIds[branchId][parentId];
    const tmpNodeParentIndex = parentChildIds.indexOf(tmpId);

    parentChildIds.splice(tmpNodeParentIndex, 1, persistedId);
    state.childIds[branchId][parentId] = state.byBranchId[branchId][parentId].childIds;

    // put the persistedId in the place of tmpId
    const tmpNodeTreeIndex = state.orderedTreeIds[branchId].indexOf(tmpId);
    state.orderedTreeIds[branchId].splice(tmpNodeTreeIndex, 1, persistedId);

    delete state.byBranchId[branchId][tmpId];
    delete state.childIds[branchId][tmpId];
}
