import { AppNodePayload, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function updateState(state: NodeState, action: PayloadAction<AppNodePayload>) {
    const { treeBranchId, id } = action.payload;
    const current = state.byBranchId[treeBranchId][id];

    if (current) {
        state.byBranchId[treeBranchId][id] = {
            ...current,
            ...action.payload,
        };
        state.titles[treeBranchId][id] = state.byBranchId[treeBranchId][id].title;
    }
}
