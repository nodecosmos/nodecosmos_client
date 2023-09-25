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
import tmpNodeReplacer from './reducers/tmpNodeReplacer';

/* extra reducers */
import createNodeFulfilledReducer from './reducers/extra/createNode.fulfilled';
import indexNodesFulfilledReducer from './reducers/extra/indexNodes.fulfilled';
import likeNodeFulfilledReducer from './reducers/extra/likeNode.fulfilled';
import showNodeFulfilledReducer from './reducers/extra/showNode.fulfilled';

import {
  createNode,
  indexNodes,
  showNode,
  deleteNode,
  likeNode,
  unlikeNode,
  getLikesCount,
  getNodeDescription,
  getNodeDescriptionBase64,
} from './nodes.thunks';
import nodeReorderer from './reducers/nodeReorderer';
import getNodeDescriptionBase64Fulfilled from './reducers/extra/getNodeDescriptionBase64.fulfilled';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    /**
     * @type {{
     *  [id: string]: {
     *    id: string,
     *    parentId: string,
     *    rootId: string,
     *    editorIds: string[],
     *    ancestorIds: string[],
     *    childIds: string[],
     *    descendantIds: string[],
     *    title: string,
     *    description: string,
     *    descriptionMarkdown: string,
     *    shortDescription: string,
     *    likesCount: number,
     *    likedByCurrentUser: boolean,
     *    coverImageUrl: string,
     *    createdAt: string,
     *    updatedAt: string,
     *    owner: {
     *      id: string,
     *      username: string,
     *    },
     *    // frontend only
     *    persistentId: string,
     *    isTemp: boolean,
     *    nestedLevel: number,
     *  }
     * }}
     *
     * @description
     */
    byId: {},
    /**
     * @type {{
     *   [parentId: string]: string[],
     * }}
     * @description
     * This is a map of rootId and parentId to childIds. It is used to determine tree nodes, as
     * tree renders children of a node, and children of children, and so on.
     */
    childIdsByParentId: {},

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
    searchNode: nodeSearcher.searchNode,
    importNode: nodeImporter.importNode,
    reorderNodes: nodeReorderer.reorderNodes,
    replaceTmpNodeWithPersistedNode: tmpNodeReplacer.replaceTmpNodeWithPersistedNode,
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, indexNodesFulfilledReducer)
      .addCase(showNode.fulfilled, showNodeFulfilledReducer)
      .addCase(createNode.fulfilled, createNodeFulfilledReducer)
      .addCase(deleteNode.fulfilled, (state, action) => nodeDeleter.deleteNodeFromState(state, action))
      .addCase(getNodeDescription.fulfilled, getNodeDescriptionFulfilled)
      .addCase(getNodeDescriptionBase64.fulfilled, getNodeDescriptionBase64Fulfilled)
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
  reorderNodes,
  searchNode,
  importNode,
  replaceTmpNodeWithPersistedNode,
} = actions;

export default reducer;
