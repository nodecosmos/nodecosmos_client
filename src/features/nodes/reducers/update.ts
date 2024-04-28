import { AppNodePayload, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function updateState(state: NodeState, action: PayloadAction<AppNodePayload>) {
    const { branchId, id } = action.payload;
    const current = state.byBranchId[branchId][id];

    if (current) {
        Object.assign(current, action.payload);

        if (action.payload.title) {
            state.titles[branchId][id] = action.payload.title;
        }
    }
}
