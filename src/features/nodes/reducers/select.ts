import { NodePrimaryKey, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function select(state: NodeState, action: PayloadAction<NodePrimaryKey | null>) {
    const current = state.selected;

    if (current) {
        state.byBranchId[current.branchId][current.id].isSelected = false;
    }

    state.selected = action.payload;

    if (action.payload) {
        const { branchId, id } = action.payload;
        state.byBranchId[branchId][id].isSelected = true;
    }
}
