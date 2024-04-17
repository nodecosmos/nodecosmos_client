import { UUID } from '../../../types';
import { NodeState, TreeNodeKey } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

// redux action
export interface BuildTmpNodeAction extends TreeNodeKey {
    currentBranchId: UUID;
    tmpId: UUID;
}

export function buildTmpNode(state: NodeState, action: PayloadAction<BuildTmpNodeAction>) {
    const {
        currentBranchId, tmpId, id,
    } = action.payload;
    const node = state.byBranchId[currentBranchId][id];
    const parentAncestors = node.ancestorIds || [];
    const lastChildIndex = state.childIds[currentBranchId][id].length - 1;
    const lastChildId = state.childIds[currentBranchId][id][lastChildIndex];
    const lastChild = state.byBranchId[currentBranchId][lastChildId];

    let orderIndex = 0;

    if (lastChild) {
        orderIndex = lastChild.orderIndex + 1;
    }

    state.byBranchId[currentBranchId][tmpId] = {
        id: tmpId,
        branchId: tmpId,
        rootId: node.rootId,
        parentId: id,
        orderIndex,
        isPublic: node.isPublic,
        isRoot: false,
        title: '',
        ownerId: node.ownerId,
        ownerType: node.ownerType,
        creatorId: node.creatorId,
        likesCount: 0,
        coverImageUrl: null,
        coverImageFilename: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        editorIds: [],
        owner: node.owner,
        persistedId: null,
        isTmp: true,
        isSelected: false,
        isEditing: true,
        ancestorIds: [...parentAncestors, id],
        childIds: [],
        treeRootId: node.treeRootId,
    };

    state.childIds[currentBranchId][id].push(tmpId);
    state.childIds[currentBranchId][tmpId] = [];
    state.byBranchId[currentBranchId][id].childIds.push(tmpId);
}

interface ReplaceProps {
    currentBranchId: UUID;
    tmpId: UUID;
}

export function replaceTmpNodeWithPersisted(state: NodeState, action: PayloadAction<ReplaceProps>) {
    const { tmpId, currentBranchId } = action.payload;

    if (tmpId && currentBranchId) {
        const tmpNode = state.byBranchId[currentBranchId][tmpId];
        const persistedId = tmpNode.persistedId as UUID;
        const newNode = state.byBranchId[currentBranchId][persistedId];
        const parentId = tmpNode.parentId;
        const parentChildIds = state.childIds[currentBranchId][parentId];
        const siblingIndex = parentChildIds.indexOf(tmpId);

        parentChildIds.splice(siblingIndex, 1, persistedId);
        state.byBranchId[currentBranchId][parentId].childIds = parentChildIds;

        if (tmpNode.isSelected) {
            newNode.isSelected = true;
            newNode.isCreationInProgress = false;
            state.selected = {
                currentBranchId,
                branchId: newNode.branchId,
                id: persistedId,
            };
        }

        // update node state
        state.byBranchId[currentBranchId][persistedId] = newNode;
        state.titles[currentBranchId][persistedId] = newNode.title;
        state.childIds[currentBranchId][persistedId] = [];

        state.justCreatedNodeId = persistedId;

        // delete state.childIds[currentBranchId][tmpNode.id];
        // delete state.titles[currentBranchId][tmpNode.id];
        // delete state.byBranchId[currentBranchId][tmpNode.id];
    }
}
