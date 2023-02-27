import { createSlice } from '@reduxjs/toolkit';
/* reducers */
import nodeChildBuilder from './reducers/nodeChildBuilder';
import nodeDeleter from './reducers/nodeDeleter';
import nodeUpdater from './reducers/nodeUpdater';
import nodeSelectionSetter from './reducers/nodeSelectionSetter';
/* extra reducers */
import createNodeFulfilledReducer from './reducers/extra/createNode.fulfilled';
import deleteNodeFulfilledReducer from './reducers/extra/deleteNode.fulfilled';
import indexNodesFulfilledReducer from './reducers/extra/indexNodes.fulfilled';
import likeNodeFulfilledReducer from './reducers/extra/likeNode.fulfilled';
import showNodeFulfilledReducer from './reducers/extra/showNode.fulfilled';

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
    buildChildNode: nodeChildBuilder.buildChildNode,
    updateNodeState: nodeUpdater.updateNodeState,
    deleteNodeFromState: nodeDeleter.deleteNodeFromState,
    setSelectedNode: nodeSelectionSetter.setSelectedNode,
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, indexNodesFulfilledReducer)
      .addCase(showNode.fulfilled, showNodeFulfilledReducer)
      .addCase(createNode.fulfilled, createNodeFulfilledReducer)
      .addCase(deleteNode.fulfilled, (state, action) => deleteNodeFulfilledReducer(state, action, nodesSlice))
      .addCase(likeNode.fulfilled, likeNodeFulfilledReducer)
      .addCase(unlikeNode.fulfilled, likeNodeFulfilledReducer);
  },
});

const {
  actions,
  reducer,
} = nodesSlice;

export const {
  updateNodeState,
  deleteNodeFromState,
  buildChildNode,
  setSelectedNode,
} = actions;

export default reducer;
