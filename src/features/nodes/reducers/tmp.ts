import { calculatePositions } from './tree';
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
    const upperSiblingId = node.childIds[node.childIds.length - 1];
    const siblingIndex = node.childIds.length;

    let treeIndex;
    if (upperSiblingId) {
        const upperSibling = state.byBranchId[treeBranchId][upperSiblingId];
        treeIndex = upperSibling.treeIndex as number + upperSibling.descendantIds.length + 1;
    } else {
        treeIndex = node.treeIndex as number + 1;
    }

    // init tmp child for node
    const tmpNode = {
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
        upperSiblingId,
        lowerSiblingId: null,
        lastChildId: null,
        isMounted: true,
        isEditing: true,
        siblingIndex,
        treeIndex,
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

    state.byBranchId[treeBranchId][tmpId] = tmpNode;

    state.childIds[treeBranchId][id].push(tmpId);
    state.childIds[treeBranchId][tmpId] = [];

    state.byBranchId[treeBranchId][id].childIds.push(tmpId);
    state.byBranchId[treeBranchId][id].lastChildId = tmpId;

    state.currentTmpNode = tmpId;

    tmpNode.ancestorIds.forEach((ancestorId) => {
        const ancestor = state.byBranchId[treeBranchId][ancestorId];

        if (ancestor) {
            ancestor.descendantIds.push(tmpId);
        }
    });

    state.orderedTreeIds[treeBranchId].splice(treeIndex, 0, tmpId);

    // update indexes of subsequent nodes
    for (let i = treeIndex + 1; i < state.orderedTreeIds[treeBranchId].length; i += 1) {
        const nodeId = state.orderedTreeIds[treeBranchId][i];
        const node = state.byBranchId[treeBranchId][nodeId];

        if (node) {
            node.treeIndex = i;
        }
    }

    calculatePositions(state, treeBranchId);
}
