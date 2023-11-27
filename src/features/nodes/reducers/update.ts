import { NodePayload, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function updateState(state: NodeState, action: PayloadAction<NodePayload>) {
    const { branchId, id } = action.payload;
    const current = state.byBranchId[branchId][id];

    if (current) {
        state.byBranchId[branchId][id] = { ...current, ...action.payload };
        state.titles[branchId][id] = state.byBranchId[branchId][id].title;
    }
}
