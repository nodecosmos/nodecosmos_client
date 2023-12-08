import { AppNodePayload, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function updateState(state: NodeState, action: PayloadAction<AppNodePayload>) {
    const { treeBranchId, id } = action.payload;
    const current = state.byBranchId[treeBranchId][id];

    if (current) {
        Object.assign(current, action.payload);

        if (action.payload.title) {
            state.titles[treeBranchId][id] = action.payload.title;
        }
    }
}
