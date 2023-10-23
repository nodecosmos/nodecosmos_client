/**
 *
 * @description
 * selectedNodeId is used for global node selection.
 * In the tree structure, we use isSelected to determine if a node is selected.
 * Otherwise, if we use selectedNodeId in tree nodes component, it would trigger a re-rendering of the whole tree.
 */
export default function setSelectedNode(state, action) {
    const id = action.payload;
    const currentSelectedNode = state.byId[state.selectedNodeId];

    if (state.selectedNodeId && currentSelectedNode) currentSelectedNode.isSelected = false;

    state.selectedNodeId = id;
    if (id) state.byId[id].isSelected = !!id;
}
