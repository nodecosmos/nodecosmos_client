export default {
  /**
   *
   * @description
   * selectedNodeId is used for global node selection.
   * In the tree structure, we use isSelected to determine if a node is selected.
   * Otherwise, if we use selectedNodeId in tree nodes component, it would trigger a re-rendering of the whole tree.
   */
  setSelectedNode(state, action) {
    const id = action.payload;
    state.selectedNodeId = id;

    // deselect all nodes
    Object.values(state.byId).forEach((node) => { node.isSelected = false; });

    // select node
    if (id) state.byId[id].isSelected = !!id;
  },
};
