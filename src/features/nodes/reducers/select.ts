import { NodeState, PKWithTreeBranch } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function select(state: NodeState, action: PayloadAction<PKWithTreeBranch | null>) {
    const current = state.selected;

    if (current) {
        state.byBranchId[current.treeBranchId][current.id].isSelected = false;
    }

    state.selected = action.payload;

    if (action.payload) {
        const { treeBranchId, id } = action.payload;
        state.byBranchId[treeBranchId][id].isSelected = true;
    }
}
