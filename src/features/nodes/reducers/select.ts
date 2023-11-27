import { NodePrimaryKey, NodeState } from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export default function select(state: NodeState, action: PayloadAction<NodePrimaryKey | null>) {
    const current = state.selectedNodePrimaryKey;

    if (current) {
        const currentSelectedNode = state.byBranchId[current.branchId][current.id];
        currentSelectedNode.isSelected = false;
    }

    state.selectedNodePrimaryKey = action.payload;

    if (state.selectedNodePrimaryKey) {
        const { branchId, id } = state.selectedNodePrimaryKey;
        const selectedNode = state.byBranchId[branchId][id];
        selectedNode.isSelected = true;
    }
}
