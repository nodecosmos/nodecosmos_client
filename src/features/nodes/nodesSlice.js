import { createSlice } from '@reduxjs/toolkit';
import treeReducers, { buildTreeFromRootNode } from './tree.reducers';

import {
  createNode, indexNodes, showNode, deleteNode,
} from './nodes.thunks';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    /**
     * @type {{
     *   id: string,
     *   parentId: string,
     *   persistentId: string,
     *   persistentParentId: string,
     *   rootId: string,
     *   editorIds: string[],
     *   childIds: string[],
     *   descendantIds: string[],
     *   descendantsById: {},
     *   title: string,
     *   description: string,
     *   descriptionMarkdown: string,
     *   createdAt: string,
     *   updatedAt: string,
     *   owner: {
     *     id: string,
     *     username: string,
     *   },
     * }}
     */
    byId: {},
    positionsById: {},
    mountedTreeNodesById: {},
    expandedTreeNodesById: {},
    childIdsByParentId: {},
    selectedNodeId: null,
    currentTempNodeId: null, // used to render & focus on the new node if it's outside the viewport
  },
  reducers: {
    ...treeReducers,
    updateNodeState(state, action) {
      const { id } = action.payload;

      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...action.payload };
      }
    },
    deleteNodeFromState(state, action) {
      const node = state.byId[action.payload.id];
      const parent = state.byId[node.parentId];

      delete state.positionsById[node.id];
      delete state.mountedTreeNodesById[node.id];
      delete state.expandedTreeNodesById[node.id];
      delete state.byId[node.id];

      if (parent) {
        // delete from childIds of parent
        state.childIdsByParentId[parent.id] = state.childIdsByParentId[parent.id].filter((id) => id !== node.id);

        // delete from descendantIds of ancestors
        node.ancestorIds.forEach((ancestorId) => {
          const ancestor = state.byId[ancestorId];
          if (ancestor) ancestor.descendantIds = ancestor.descendantIds.filter((id) => id !== node.id);
        });
      }
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
      state.childIdsByParentId[id] = [];

      if (action.payload.isReplacingTempNode) {
        state.byId[action.payload.tempId].id = id;
      } else {
        state.byId[id] = {
          id,
          isEditing: true,
          isTemp: true,
          parentId,
          ancestorIds: nodeAncestorIds,
          descendantIds: [],
          childIds: [],
          owner: parent.owner,
          ...action.payload,
        };
      }

      // used to render & focus on the new node if it's outside the viewport
      state.currentTempNodeId = id;
      // add temp node to parent's children
      state.childIdsByParentId[parentId].push(id);
      nodeAncestorIds.forEach((ancestorId) => {
        // add temp node to ancestor's descendants
        if (state.byId[ancestorId]) state.byId[ancestorId].descendantIds.push(id);
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => {
        action.payload.forEach((payload) => {
          const { id } = payload;
          state.byId[id] = payload;
          state.childIdsByParentId[id] = [];
          state.mountedTreeNodesById[id] = true;
          state.expandedTreeNodesById[id] = false;
        });
      })
      .addCase(showNode.fulfilled, (state, action) => {
        buildTreeFromRootNode({ state, rootNode: action.payload });
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
} = actions;

export default reducer;
