import {
    AppNode, NodePrimaryKey, NodeState,
} from '../nodes.types';
import { PayloadAction } from '@reduxjs/toolkit';

export function expandNode(state: NodeState, action: PayloadAction<NodePrimaryKey>) {
    const { branchId, id } = action.payload;

    const node = state.byBranchId[branchId][id];

    node.isExpanded = true;

    mountDescendants(state, node);
}

export function collapseNode(state: NodeState, action: PayloadAction<NodePrimaryKey>) {
    const { branchId, id } = action.payload;

    const node = state.byBranchId[branchId][id];

    node.isExpanded = false;

    unmountDescendants(state, node);
}

function mountDescendants(state: NodeState, node: AppNode) {
    const { descendantIds, branchId } = node;

    descendantIds.forEach((id) => {
        const { ancestorIds } = state.byBranchId[branchId][id];

        // mount node if all ancestors are expanded
        state.byBranchId[branchId][id].isMounted = ancestorIds.every(
            (ancestorId) => state.byBranchId[branchId][ancestorId].isExpanded,
        );
    });
}

function unmountDescendants (state: NodeState, node: AppNode) {
    const { descendantIds, branchId } = node;

    descendantIds.forEach((id) => {
        state.byBranchId[branchId][id].isMounted = false;
    });
}

