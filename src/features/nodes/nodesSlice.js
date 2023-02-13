import { createSlice } from '@reduxjs/toolkit';

import {
  createNode, indexNodes, showNode, deleteNode,
} from './nodes.thunks';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    /**
     * @type {{
     * [id: string]: {
     *   id: string,
     *   parentId: string,
     *   persistentId: string,
     *   persistentParentId: string,
     *   rootId: string,
     *   editorIds: string[],
     *   childIds: string[],
     *   descendantIds: string[],
     *   descendantsById: {} | null,
     *   title: string,
     *   description: string,
     *   descriptionMarkdown: string,
     *   createdAt: string,
     *   updatedAt: string,
     *   owner: {
     *     id: string,
     *     username: string,
     *   },
     * }
     * }}
     */
    byId: {},
    selectedNodeId: null,
  },
  reducers: {
    updateNodeState(state, action) {
      const { id } = action.payload;

      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...action.payload };
      }
    },
    deleteNodeFromState(state, action) {
      const node = state.byId[action.payload.id];
      const parent = state.byId[node.parentId];
      delete state.byId[node.id];

      if (parent) {
        // delete from childIds of parent
        parent.childIds = parent.childIds.filter((id) => id !== node.id);

        // delete from descendantIds of ancestors
        node.ancestorIds.forEach((ancestorId) => {
          const ancestor = state.byId[ancestorId];
          if (ancestor) ancestor.descendantIds = ancestor.descendantIds.filter((id) => id !== node.id);
        });
      }
    },
    setEditNodeDescription(state, action) {
      const { id, value } = action.payload;
      state.byId[id].isEditingDescription = value;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => {
        action.payload.forEach((node) => { state.byId[node.id] = node; });
      })
      .addCase(showNode.fulfilled, (state, action) => {
        const node = action.payload;
        state.byId[node.id] = node;
        state.byId = { ...state.byId, ...node.descendantsById };
      })
      .addCase(createNode.fulfilled, (state, action) => {
        state.byId[action.payload.id] = action.payload;
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
  updateNodeState,
  deleteNodeFromState,
  setEditNodeDescription,
} = actions;

export default reducer;
