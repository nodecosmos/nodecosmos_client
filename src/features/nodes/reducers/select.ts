import { NodeState, SelectedNode } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function select(state: NodeState, action: PayloadAction<SelectedNode | null>) {
    const current = state.selected;

    if (current) {
        const currentSelectedNode = state.byBranchId[current.branchId][current.id];
        currentSelectedNode.isSelected = false;
    }

    state.selected = action.payload;

    if (state.selected) {
        const { branchId, id } = state.selected;
        const selectedNode = state.byBranchId[branchId][id];
        selectedNode.isSelected = true;
    }
}
