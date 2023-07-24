import { createSlice } from '@reduxjs/toolkit';
import { NODE_PANE_CONTENTS } from './nodes.constants';
import getNodeDescriptionFulfilled from './reducers/extra/getNodeDescription.fulfilled';
/* reducers */
import nodeChildBuilder from './reducers/nodeChildBuilder';
import nodeDeleter from './reducers/nodeDeleter';
import nodeUpdater from './reducers/nodeUpdater';
import nodeSelectionSetter from './reducers/nodeSelectionSetter';
import nodePaneContentSetter from './reducers/nodePaneContentSetter';
import nodeSearcher from './reducers/nodeSearcher';
import nodeImporter from './reducers/nodeImporter';

/* extra reducers */
import createNodeFulfilledReducer from './reducers/extra/createNode.fulfilled';
import indexNodesFulfilledReducer from './reducers/extra/indexNodes.fulfilled';
import likeNodeFulfilledReducer from './reducers/extra/likeNode.fulfilled';
import showNodeFulfilledReducer from './reducers/extra/showNode.fulfilled';

import {
  createNode, indexNodes, showNode, deleteNode, likeNode, unlikeNode, getLikesCount, getNodeDescription,
} from './nodes.thunks';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    /**
     * @type {{
     *  [id: string]: {
     *    id: string,
     *    parentId: string,
     *    persistentId: string,
     *    persistentParentId: string,
     *    persistentRootId: string,
     *    rootId: string,
     *    editorIds: string[],
     *    ancestorIds: string[],
     *    childIds: string[],
     *    descendantIds: string[],
     *    descendantsById: {} | null,
     *    title: string,
     *    description: string,
     *    descriptionMarkdown: string,
     *    shortDescription: string,
     *    likesCount: number,
     *    likedByCurrentUser: boolean,
     *    createdAt: string,
     *    updatedAt: string,
     *    owner: {
     *      id: string,
     *      username: string,
     *    },
     *  }
     * }}
     *
     * @description
     * Usually persistentId and nodeId are the same. However, in case we work with the Tree, we generate tmp id for
     * new node as nodeId. Obviously, we cannot use this id to communicate with the backend, so we need to leave
     * nodeId as it is, and use persistentId to communicate with the backend and get the latest changes from state.
     * We can get the latest changes from state because we map persistentId to new node after node is created.
     */
    byId: {},
    /**
     * @type {{
     *   [rootId: string]: {
     *     [parentId: string]: string[],
     *   }
     * }}
     * @description
     * This is a map of rootId and parentId to childIds. It is used to determine tree nodes, as
     * tree renders children of a node, and children of children, and so on.
     */
    childIdsByRootAndParentId: {},

    persistedIdByNodeId: {},

    /**
     * @description
     * Used for showing details of selected node.
     */
    selectedNodeId: null,

    /**
     * @type string
     * @variant 'markdown' | 'description' | 'workflow'
     */
    nodePaneContent: NODE_PANE_CONTENTS.description,

    /**
     * @description
     * Used for search.
     */
    nodeTitlesById: {},

    /**
     * @description
     * Nodes used for index page.
     */
    indexNodesById: {},

  },
  reducers: {
    buildChildNode: nodeChildBuilder.buildChildNode,
    updateNodeState: nodeUpdater.updateNodeState,
    deleteNodeFromState: nodeDeleter.deleteNodeFromState,
    setSelectedNode: nodeSelectionSetter.setSelectedNode,
    setNodePaneContent: nodePaneContentSetter.setNodePaneContent,
    setDefaultNodeDetailsAction: nodePaneContentSetter.setDefaultNodeDetailsAction,
    searchNode: nodeSearcher.searchNode,
    importNode: nodeImporter.importNode,
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, indexNodesFulfilledReducer)
      .addCase(showNode.fulfilled, showNodeFulfilledReducer)
      .addCase(createNode.fulfilled, createNodeFulfilledReducer)
      .addCase(deleteNode.fulfilled, (state, action) => nodeDeleter.deleteNodeFromState(state, action))
      .addCase(getNodeDescription.fulfilled, getNodeDescriptionFulfilled)
      .addCase(getLikesCount.fulfilled, likeNodeFulfilledReducer)
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
  setNodePaneContent,
  setDefaultNodeDetailsAction,
  searchNode,
  importNode,
} = actions;

export default reducer;
