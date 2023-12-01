import { virtualizeNodes } from './tree';
import { create } from '../nodes.thunks';
import { NodeState } from '../nodes.types';

export default function createFulfilled(state: NodeState, action: ReturnType<typeof create.fulfilled>) {
    const { id, parentId } = action.payload;
    const { tmpNodeId, treeBranchId } = action.meta.arg;

    if (tmpNodeId && treeBranchId) {
        const tmpNode = state.byBranchId[treeBranchId][tmpNodeId];
        const treeIndex = tmpNode.treeIndex as number;
        const siblingIndex = tmpNode.siblingIndex as number;
        const upperSiblingId = tmpNode.upperSiblingId;
        const lowerSiblingId = tmpNode.lowerSiblingId;
        const parentChildIds = state.childIds[treeBranchId][parentId];
        const newNode = {
            ...tmpNode,
            ...action.payload,
            persistedId: id,
            isJustCreated: true,
            isTemp: false,
        };

        // replace tmp id with persisted id within the parent
        parentChildIds.splice(siblingIndex, 1, id);
        state.byBranchId[treeBranchId][parentId].childIds = parentChildIds;

        if (state.byBranchId[treeBranchId][parentId].lastChildId === tmpNodeId) {
            state.byBranchId[treeBranchId][parentId].lastChildId = id;
        }

        // replace tmpId with persistedId within the descendantIds of the ancestors
        newNode.ancestorIds.forEach((ancestorId) => {
            const ancestor = state.byBranchId[treeBranchId][ancestorId];
            if (ancestor) {
                const { descendantIds } = ancestor;
                const tmpNodeDescendantIndex = descendantIds.indexOf(tmpNodeId);
                descendantIds.splice(tmpNodeDescendantIndex, 1, id);
            }
        });

        if (tmpNode.isSelected) {
            state.selected = {
                treeBranchId,
                branchId: newNode.branchId,
                id,
            };
        }

        // update lower sibling of upper sibling
        if (upperSiblingId) {
            state.byBranchId[treeBranchId][upperSiblingId].lowerSiblingId = id;
        }

        // update upper sibling of lower sibling
        if (lowerSiblingId) {
            state.byBranchId[treeBranchId][lowerSiblingId].upperSiblingId = id;
        }

        // update tree
        state.orderedTreeIds[treeBranchId].splice(treeIndex, 1, id);

        // update node state
        state.byBranchId[treeBranchId][id] = newNode;
        state.titles[treeBranchId][id] = newNode.title;
        state.childIds[treeBranchId][id] = [];

        delete state.byBranchId[treeBranchId][tmpNodeId];
        delete state.childIds[treeBranchId][tmpNodeId];
        delete state.titles[treeBranchId][tmpNodeId];

        virtualizeNodes(state, treeBranchId);
    }
}
