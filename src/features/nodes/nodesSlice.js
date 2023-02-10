import { createSlice } from '@reduxjs/toolkit';
import {
  createNode, indexNodes, showNode, deleteNode,
} from './nodes.thunks';

const mapNodesToState = (state, nodes) => {
  nodes.forEach((payload) => {
    const { id } = payload;

    payload.persistentId = id;
    payload.parentId = payload.parent_id;

    payload.ancestorIds = payload.ancestor_ids || [];
    payload.descendantIds = payload.descendant_ids || [];

    state.nestedNodesByParentId[id] = payload.node_ids;
    state.mountedTreeNodesById[id] = payload.isMounted || false;

    state.byId[id] = payload;
  });
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    byId: {},
    positionsById: {},
    mountedTreeNodesById: {},
    expandedTreeNodesById: {},
    nestedNodesByParentId: {},
    selectedNodeId: null,
    currentTempNodeId: null, // used to render & focus on the new node if it's outside the viewport
  },
  reducers: {
    deleteRootDescendantArray(state, action) { delete state[action.payload.id].descendants; },
    expandNode(state, action) {
      const { id } = action.payload;

      state.expandedTreeNodesById[id] = true;

      const { descendantIds } = state.byId[id];

      nodesSlice.caseReducers.mountNodes(state, { payload: descendantIds });
    },
    collapseNode(state, action) {
      const { id } = action.payload;

      state.expandedTreeNodesById[id] = false;

      const { descendantIds } = state.byId[id];

      nodesSlice.caseReducers.unmountNodes(state, { payload: descendantIds });
    },
    mountNodes(state, action) {
      action.payload.forEach((id) => {
        const node = state.byId[id];
        // convert undefined to false for existing nodes that are not expanded
        state.expandedTreeNodesById[id] = !!state.expandedTreeNodesById[id];
        // mount the node if all its ancestors are expanded
        const areAncestorsExpanded = node.ancestorIds.every(
          // ancestor not in the tree
          (ancestorId) => state.expandedTreeNodesById[ancestorId] === undefined
            || state.expandedTreeNodesById[ancestorId],
        );
        if (areAncestorsExpanded) state.mountedTreeNodesById[id] = true;
      });
    },
    unmountNodes(state, action) { action.payload.forEach((id) => { state.mountedTreeNodesById[id] = false; }); },
    updateNodeState(state, action) {
      const { id } = action.payload;

      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...action.payload };
      }
    },
    deleteNodeFromState(state, action) {
      const node = state.byId[action.payload.id];
      const parent = state.byId[node.parentId];

      if (parent) {
        state.nestedNodesByParentId[parent.id] = state.nestedNodesByParentId[parent.id].filter((id) => id !== node.id);
      }

      delete state.positionsById[node.id];
      delete state.mountedTreeNodesById[node.id];
      delete state.expandedTreeNodesById[node.id];
      delete state.byId[node.id];

      node.ancestorIds.forEach((ancestorId) => {
        const ancestor = state.byId[ancestorId];
        if (ancestor) ancestor.descendantIds = ancestor.descendantIds.filter((id) => id !== node.id);
      });
    },
    setPositionsById(state, action) { state.positionsById = action.payload; },
    setSelectedNode(state, action) {
      const { id } = action.payload;

      const prevCurrentNode = Object.values(state.byId).find((node) => node.isCurrent);
      if (prevCurrentNode) prevCurrentNode.isCurrent = false;
      state.selectedNodeId = null;

      if (id) {
        state.byId[id].isCurrent = true;
        state.selectedNodeId = id;
      }
    },
    setEditNodeDescription(state, action) {
      const { id, value } = action.payload;
      state.byId[id].isEditingDescription = value;
    },
    //------------------------------------------------------------------------------------------------------------------
    addTmpNewNode(state, action) {
      const { parentId } = action.payload;

      const parent = state.byId[parentId];
      // This seems to go against the redux way of doing things
      // https://redux.js.org/style-guide/#reducers-must-not-have-side-effects
      const id = (Math.random() + 1).toString(36); // automatic id for tmp node

      const nodeAncestorIds = action.payload.ancestorIds
      || parent.ancestorIds.length ? [parentId, ...parent.ancestorIds] : [parentId];

      state.mountedTreeNodesById[id] = true;
      state.expandedTreeNodesById[id] = false;
      state.nestedNodesByParentId[id] = [];

      if (action.payload.isReplacingTempNode) {
        state.byId[action.payload.tempId].id = id;
      } else {
        state.byId[id] = {
          id,
          isEditing: true,
          isTemp: true,
          parentId,
          ancestorIds: nodeAncestorIds,
          nodeIds: [],
          descendantIds: [],
          owner: parent.owner,
          ...action.payload,
        };
      }

      // used to render & focus on the new node if it's outside the viewport
      state.currentTempNodeId = id;
      // add temp node to parent's children
      state.nestedNodesByParentId[parentId].push(id);
      nodeAncestorIds.forEach((ancestorId) => {
        // add temp node to ancestor's descendants
        if (state.byId[ancestorId]) state.byId[ancestorId].descendantIds.push(id);
      });
    },
    //------------------------------------------------------------------------------------------------------------------
    clearTree(state, _action) {
      Object.keys(state.byId).forEach((currentId) => {
        delete state.positionsById[currentId];
        delete state.mountedTreeNodesById[currentId];
        delete state.expandedTreeNodesById[currentId];
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => mapNodesToState(state, action.payload))
      .addCase(showNode.fulfilled, (state, action) => {
        mapNodesToState(state, [{ ...action.payload, isMounted: true, isRoot: true }]);
        mapNodesToState(state, action.payload?.descendants || []);
        delete state.byId[action.payload.id].descendants;
      })
      .addCase(createNode.fulfilled, (state, action) => {
        // assign persistent id to temp node
        state.byId[action.payload.tempId].persistentId = action.payload.id;
      })
      .addCase(deleteNode.fulfilled, (state, action) => {
        nodesSlice.caseReducers.deleteNodeFromState(state, action);
      });
  },
});

const {
  actions,
  reducer,
} = nodesSlice;

export const {
  expandNode,
  collapseNode,
  updateNodeState,
  deleteNodeFromState,
  addTmpNewNode,
  setSelectedNode,
  setPositionsById,
  setEditNodeDescription,
  clearTree,
} = actions;

export default reducer;
