import { UUID } from '../../../types';
import { NodeState, TreeNodeKey } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

// redux action
export interface BuildTmpNodeAction extends TreeNodeKey {
    branchId: UUID;
    tmpId: UUID;
}

export function buildTmpNode(state: NodeState, action: PayloadAction<BuildTmpNodeAction>) {
    const {
        branchId, tmpId, id,
    } = action.payload;
    const node = state.byBranchId[branchId][id];
    const parentAncestors = node.ancestorIds || [];
    const lastChildIndex = state.childIds[branchId][id].length - 1;
    const lastChildId = state.childIds[branchId][id][lastChildIndex];
    const lastChild = state.byBranchId[branchId][lastChildId];

    let orderIndex = 0;

    if (lastChild) {
        orderIndex = lastChild.orderIndex + 1;
    }

    state.byBranchId[branchId][tmpId] = {
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
        likeCount: 0,
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

    state.childIds[branchId][id].push(tmpId);
    state.childIds[branchId][tmpId] = [];
    state.byBranchId[branchId][id].childIds.push(tmpId);
}

interface ReplaceProps {
    branchId: UUID;
    tmpId: UUID;
}

export function replaceTmpNodeWithPersisted(state: NodeState, action: PayloadAction<ReplaceProps>) {
    const { tmpId, branchId } = action.payload;

    if (tmpId && branchId) {
        const tmpNode = state.byBranchId[branchId][tmpId];
        const persistedId = tmpNode.persistedId as UUID;
        const newNode = state.byBranchId[branchId][persistedId];
        const parentId = tmpNode.parentId;
        const parentChildIds = state.childIds[branchId][parentId];
        const siblingIndex = parentChildIds.indexOf(tmpId);

        parentChildIds.splice(siblingIndex, 1, persistedId);
        state.byBranchId[branchId][parentId].childIds = parentChildIds;

        if (tmpNode.isSelected) {
            newNode.isSelected = true;
            newNode.isCreationInProgress = false;
            state.selected = {
                branchId,
                id: persistedId,
            };
        }

        // update node state
        state.byBranchId[branchId][persistedId] = newNode;
        state.titles[branchId][persistedId] = newNode.title;
        state.childIds[branchId][persistedId] = [];

        state.justCreatedNodeId = persistedId;

        // delete state.childIds[branchId][tmpNode.id];
        // delete state.titles[branchId][tmpNode.id];
        // delete state.byBranchId[branchId][tmpNode.id];
    }
}
