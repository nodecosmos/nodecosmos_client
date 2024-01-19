import { UUID } from '../../../types';
import { NodeState, TreeNodeKey } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

// redux action
export interface BuildTmpNodeAction extends TreeNodeKey {
    treeBranchId: UUID;
    tmpId: UUID;
}

export function buildTmpNode(state: NodeState, action: PayloadAction<BuildTmpNodeAction>) {
    const {
        treeBranchId, tmpId, id,
    } = action.payload;
    const node = state.byBranchId[treeBranchId][id];
    const parentAncestors = node.ancestorIds || [];

    state.byBranchId[treeBranchId][tmpId] = {
        id: tmpId,
        branchId: tmpId,
        rootId: node.rootId,
        parentId: id,
        order: state.childIds[treeBranchId][id].length + 1,
        isPublic: node.isPublic,
        isRoot: false,
        title: '',
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
        isTmp: true,
        isSelected: false,
        isEditing: true,
        ancestorIds: [...parentAncestors, id],
        childIds: [],
        treeRootId: node.treeRootId,
    };

    state.childIds[treeBranchId][id].push(tmpId);
    state.childIds[treeBranchId][tmpId] = [];
    state.byBranchId[treeBranchId][id].childIds.push(tmpId);
}

interface ReplaceProps {
    treeBranchId: UUID;
    tmpId: UUID;
}

export function replaceTmpNodeWithPersisted(state: NodeState, action: PayloadAction<ReplaceProps>) {
    const { tmpId, treeBranchId } = action.payload;

    if (tmpId && treeBranchId) {
        const tmpNode = state.byBranchId[treeBranchId][tmpId];
        const persistedId = tmpNode.persistedId as UUID;
        const newNode = state.byBranchId[treeBranchId][persistedId];
        const parentId = tmpNode.parentId;
        const parentChildIds = state.childIds[treeBranchId][parentId];
        const siblingIndex = parentChildIds.indexOf(tmpId);

        parentChildIds.splice(siblingIndex, 1, persistedId);
        state.byBranchId[treeBranchId][parentId].childIds = parentChildIds;

        if (tmpNode.isSelected) {
            state.selected = {
                treeBranchId,
                branchId: newNode.branchId,
                id: persistedId,
            };
        }

        // update node state
        state.byBranchId[treeBranchId][persistedId] = newNode;
        state.titles[treeBranchId][persistedId] = newNode.title;
        state.childIds[treeBranchId][persistedId] = [];

        state.justCreatedNodeId = persistedId;

        delete state.childIds[treeBranchId][tmpNode.id];
        delete state.titles[treeBranchId][tmpNode.id];
        delete state.byBranchId[treeBranchId][tmpNode.id];
    }
}
