import { createSlice } from '@reduxjs/toolkit';
import {
  createNode, indexNodes, showNode, deleteNode,
} from './nodes.thunks';

const mapNodesToState = (state, nodes) => {
  nodes.forEach((payload) => {
    const { id } = payload;

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
        const areAncestorsExpanded = node.ancestorIds.every(
          (ancestorId) => !state.byId[ancestorId] || state.expandedTreeNodesById[ancestorId],
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
      const parent = state.byId[node.parent_id];

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
      const parentId = action.payload.parent_id;

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
          parent_id: parentId,
          ancestorIds: nodeAncestorIds,
          nodeIds: [],
          descendantIds: [],
          owner: {
            username: '',
          },
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
    mapPersistedNodeToState(state, action) {
      const { id, tempId } = action.payload;

      state.currentTempNodeId = null;

      const newNode = {
        ...action.payload,
        isTemp: false,
        isMounted: true,
        isReplacingTempNode: true,
        isEditing: state.byId[tempId].isEditing,
        ancestorIds: action.payload.ancestor_ids,
        nodeIds: [],
        descendantIds: [],
      };

      state.nestedNodesByParentId[id] = action.payload.node_ids;
      state.mountedTreeNodesById[id] = true;

      const tempNodeParentId = state.byId[tempId].parent_id;

      // replace temp node with new node in parent's children
      state.nestedNodesByParentId[tempNodeParentId] = state.nestedNodesByParentId[tempNodeParentId].map((childId) => {
        if (childId === tempId) return id;
        return childId;
      });

      // replace temp node with new node in ancestor's descendants
      newNode.ancestorIds.forEach((ancestorId) => {
        if (state.byId[ancestorId]) {
          state.byId[ancestorId].descendantIds = state.byId[ancestorId].descendantIds.map((childId) => {
            if (childId === tempId) return id;
            return childId;
          });
        }
      });

      // set position of new node
      state.positionsById[id] = state.positionsById[tempId];
      state.byId[id] = newNode;
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
        nodesSlice.caseReducers.mapPersistedNodeToState(state, action);
        nodesSlice.caseReducers.deleteNodeFromState(state, { payload: { id: action.payload.tempId } });
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
  setSelectedNode,
  updateNodeState,
  deleteNodeFromState,
  addTmpNewNode,
  setPositionsById,
  setEditNodeDescription,
  clearTree,
} = actions;

export default reducer;
