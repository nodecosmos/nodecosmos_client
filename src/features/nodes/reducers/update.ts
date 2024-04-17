import { AppNodePayload, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function updateState(state: NodeState, action: PayloadAction<AppNodePayload>) {
    const { currentBranchId, id } = action.payload;
    const current = state.byBranchId[currentBranchId][id];

    if (current) {
        Object.assign(current, action.payload);

        if (action.payload.title) {
            state.titles[currentBranchId][id] = action.payload.title;
        }
    }
}
