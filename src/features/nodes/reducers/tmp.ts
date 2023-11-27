import { UUID } from '../../../types';
import { NodePrimaryKey, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

// redux action
export interface BuildTmpNodeAction {
    tmpNodeId: UUID;
    branchId: UUID;
    nodeId: UUID;
}

export function buildTmpNode(state: NodeState, action: PayloadAction<BuildTmpNodeAction>) {
    const {
        tmpNodeId, branchId, nodeId,
    } = action.payload;

    const node = state.byBranchId[branchId][nodeId];

    state.byBranchId[node.branchId][tmpNodeId] = {
        id: tmpNodeId,
        branchId: node.branchId,
        rootId: node.rootId,
        parentId: nodeId,
        order: state.childIds[branchId][nodeId].length + 1,
        isPublic: node.isPublic,
        isRoot: false,
        title: '',
        ancestorIds: [nodeId, ...node.ancestorIds],
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
        persistentId: null,
        isTemp: true,
        isSelected: false,
        nestedLevel: node.nestedLevel + 1,
        descendantIds: [],
        childIds: [],
        treeRootNodeId: node.treeRootNodeId,
        likedByCurrentUser: null,
        x: 0, xEnd: 0, y: 0, yEnd: 0,
    };

    state.childIds[branchId][nodeId].push(tmpNodeId);
    state.childIds[branchId][tmpNodeId] = [];
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
    tmpNodeId: UUID;
    persistentId: UUID;
}

export function replaceTmpWithPersisted(state: NodeState, action: PayloadAction<NodeReplacePayload>) {
    const {
        branchId, tmpNodeId, persistentId,
    } = action.payload;
    const newNode = state.byBranchId[branchId][persistentId];
    const tmpNode = state.byBranchId[branchId][tmpNodeId];
    const { parentId } = tmpNode;

    state.byBranchId[branchId][persistentId] = {
        ...newNode,
        id: persistentId,
        persistentId,
        isTemp: false,
        isSelected: tmpNode.isSelected,
        x: tmpNode.x,
        xEnd: tmpNode.xEnd,
        y: tmpNode.y,
        yEnd: tmpNode.yEnd,

    };

    if (tmpNode.isSelected) {
        state.selectedNodePrimaryKey = { id: persistentId, branchId };
    }

    // replace tmpNodeId with persistentId within the childIds of the parent
    const parentChildIds = state.childIds[branchId][parentId];
    const tmpNodeParentIndex = parentChildIds.indexOf(tmpNodeId);

    parentChildIds.splice(tmpNodeParentIndex, 1, persistentId);
    state.childIds[branchId][parentId] = state.byBranchId[branchId][parentId].childIds;

    // put the persistentId in the place of tmpNodeId
    const tmpNodeTreeIndex = state.orderedTreeIds[branchId].indexOf(tmpNodeId);
    state.orderedTreeIds[branchId].splice(tmpNodeTreeIndex, 1, persistentId);

    delete state.byBranchId[branchId][tmpNodeId];
    delete state.childIds[branchId][tmpNodeId];
}
