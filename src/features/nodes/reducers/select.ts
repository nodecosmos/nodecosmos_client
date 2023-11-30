import { NodeState, PKWithTreeBranch } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function select(state: NodeState, action: PayloadAction<PKWithTreeBranch | null>) {
    const current = state.selected;

    if (current) {
        const currentSelectedNode = state.byBranchId[current.treeBranchId][current.id];
        currentSelectedNode.isSelected = false;
    }

    state.selected = action.payload;

    if (state.selected) {
        const { treeBranchId, id } = state.selected;
        const selectedNode = state.byBranchId[treeBranchId][id];
        selectedNode.isSelected = true;
    }
}
