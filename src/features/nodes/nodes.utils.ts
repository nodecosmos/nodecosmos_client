import { NodePrimaryKey, NodeState } from './nodes.types';

export function selectNodeFromParams(state: NodeState, pk: NodePrimaryKey) {
    const { branchId, id } = pk;
    const branchNodes = state.byBranchId[branchId];

    if (!branchNodes) return;

    const node = branchNodes[id];

    if (node) {
        state.expandedNodes.add(id);

        node.ancestorIds.forEach((ancestorId) => {
            state.expandedNodes.add(ancestorId);
        });

        if (state.selected) {
            const { branchId: selectedBranchId, id: selectedId } = state.selected;

            if (branchId !== selectedBranchId || id !== selectedId) {
                state.byBranchId[selectedBranchId][selectedId].isSelected = false;
            }
        }

        state.byBranchId[branchId][id].isSelected = true;
        state.selected = {
            branchId,
            id,
        };
    }
}
