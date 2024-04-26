import { NodeState, PKWithCurrentBranch } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function select(state: NodeState, action: PayloadAction<PKWithCurrentBranch | null>) {
    const current = state.selected;

    if (current) {
        state.byBranchId[current.currentBranchId][current.id].isSelected = false;
    }

    state.selected = action.payload;

    if (action.payload) {
        const { currentBranchId, id } = action.payload;
        state.byBranchId[currentBranchId][id].isSelected = true;
    }
}
