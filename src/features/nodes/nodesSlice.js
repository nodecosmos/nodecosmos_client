import { createSlice } from '@reduxjs/toolkit';

import {
  createNode, indexNodes, showNode, deleteNode, likeNode, unlikeNode,
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
     *   likesCount: number,
     *   likedByUserIds: string[],
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
    indexNodesById: {},
    childIdsByRootAndParentId: {},
    selectedNodeId: null,
  },
  reducers: {
    /**
     *
     * @description
     * selectedNodeId is used for global node selection.
     * However, in the tree structure, we use isSelected to determine if a node is selected.
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
    updateNodeState(state, action) {
      const { id } = action.payload;

      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...action.payload };
      }
    },
    deleteNodeFromState(state, action) {
      const { nodeId } = action.payload;

      const node = state.byId[nodeId];
      const parent = state.byId[node.parentId];

      const childIdsByRootAndParentId = state.childIdsByRootAndParentId[node.rootId];

      childIdsByRootAndParentId[node.id] = null;

      // filter from childIdsByRootAndParentId
      childIdsByRootAndParentId[nodeId] = null;
      if (parent) {
        childIdsByRootAndParentId[node.parentId] = childIdsByRootAndParentId[node.parentId].filter(
          (id) => id !== node.id,
        );
        parent.childIds = parent.childIds.filter((id) => id !== nodeId);
      }

      // delete state.byId[nodeId] - race condition: seems existing components are kept before tree re-render
      // let's see if we can fix this
    },
    setEditNodeDescription(state, action) {
      const { id, value } = action.payload;
      state.byId[id].isEditingDescription = value;
    },
    buildChildNode(state, action) {
      const { tmpNodeId, nodeId, persistentId } = action.payload;
      const node = state.byId[nodeId];

      state.byId[tmpNodeId] = {
        id: tmpNodeId,
        persistentId: null,
        parentId: nodeId,
        persistentParentId: persistentId,
        rootId: node.rootId,
        isTemp: true,
        likesCount: 0,
        likedByUserIds: [],
        childIds: [],
      }; // add new node to state

      state.childIdsByRootAndParentId[node.rootId][nodeId].push(tmpNodeId); // add new node to parent's childIds
      state.childIdsByRootAndParentId[node.rootId][tmpNodeId] = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => {
        action.payload.forEach((node) => { state.indexNodesById[node.id] = node; });
      })
      .addCase(showNode.fulfilled, (state, action) => {
        action.payload.forEach((node) => {
          node.childIds ||= [];
          state.byId[node.id] = node;
          state.childIdsByRootAndParentId[node.rootId] ||= {};
          state.childIdsByRootAndParentId[node.rootId][node.id] ||= node.childIds;
        });
      })
      .addCase(createNode.fulfilled, (state, action) => {
        const { tmpNodeId, id } = action.payload;
        state.byId[id] = action.payload; // add new node to state
        /**
         * @description
         * tmpNodeId will still be used for tree structure
         */
        state.byId[tmpNodeId].isTemp = false;
        state.byId[tmpNodeId].persistentId = id;
      })
      .addCase(deleteNode.fulfilled, (state, action) => {
        nodesSlice.caseReducers.deleteNodeFromState(state, action);
      })
      .addCase(likeNode.fulfilled, (state, action) => {
        const { id, likesCount, likedByUserIds } = action.payload;
        state.byId[id].likesCount = likesCount;
        state.byId[id].likedByUserIds = likedByUserIds;
      })
      .addCase(unlikeNode.fulfilled, (state, action) => {
        const { id, likesCount, likedByUserIds } = action.payload;
        state.byId[id].likesCount = likesCount;
        state.byId[id].likedByUserIds = likedByUserIds;
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
  buildChildNode,
  setSelectedNode,
} = actions;

export default reducer;
