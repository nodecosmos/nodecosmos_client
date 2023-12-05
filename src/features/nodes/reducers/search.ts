import { UUID } from '../../../types';
import { NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export interface SearchNodePayload {
    rootId: UUID;
    treeBranchId: UUID;
    value: string;
}

export default function search(state: NodeState, action: PayloadAction<SearchNodePayload>) {
    const {
        treeBranchId, rootId, value,
    } = action.payload;

    if (value) {
        // search by title
        const newChildIds: NodeState['childIds'] = {};
        newChildIds[treeBranchId] = {};

        for (const nodeId in state.byBranchId[treeBranchId]) {
            if (state.byBranchId[treeBranchId][nodeId].title
                && state.byBranchId[treeBranchId][nodeId].rootId === rootId
                && state.byBranchId[treeBranchId][nodeId].title.toLowerCase()
                    .includes(value.toLowerCase())) {
                newChildIds[treeBranchId][nodeId] ||= [];
                let currentNodeId = nodeId;
                let { parentId } = state.byBranchId[treeBranchId][nodeId];

                while (parentId) {
                    if (state.byBranchId[treeBranchId][parentId]) {
                        newChildIds[treeBranchId][parentId] ||= [];

                        if (!newChildIds[treeBranchId][parentId].includes(currentNodeId)) {
                            newChildIds[treeBranchId][parentId].push(currentNodeId);
                        }

                        currentNodeId = parentId;
                        parentId = state.byBranchId[treeBranchId][parentId].parentId;
                    } else {
                        break;
                    }
                }
            }
        }

        state.childIds = newChildIds;
    } else {
        for (const nodeId in state.byBranchId[treeBranchId]) {
            state.childIds[treeBranchId][nodeId] = state.byBranchId[treeBranchId][nodeId].childIds;
        }
    }
}
