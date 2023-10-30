import { NODE_PANE_CONTENTS } from './nodes.constants';
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
import createNodeFulfilledReducer from './reducers/extra/createNode.fulfilled';
import getNodeDescriptionFulfilled from './reducers/extra/getNodeDescription.fulfilled';
import getNodeDescriptionBase64Fulfilled from './reducers/extra/getNodeDescriptionBase64.fulfilled';
import indexNodesFulfilledReducer from './reducers/extra/indexNodes.fulfilled';
import likeNodeFulfilledReducer from './reducers/extra/likeNode.fulfilled';
import showNodeFulfilledReducer from './reducers/extra/showNode.fulfilled';
import deleteNodeFromState from './reducers/nodeDelete';
import importNode from './reducers/nodeImport';
import setNodePaneContent from './reducers/nodePaneContent';
import reorderNodes from './reducers/nodeReorder';
import searchNode from './reducers/nodeSearch';
import setSelectedNode from './reducers/nodeSelect';
import updateNodeState from './reducers/nodeUpdate';
import buildTmpNode from './reducers/tmpNodeAdd';
import clearTmpNode from './reducers/tmpNodeClean';
import replaceTmpNodeWithPersistedNode from './reducers/tmpNodeReplace';
import { createSlice } from '@reduxjs/toolkit';

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

        /**
     * @description
     * Currently used to prevent addon of new nodes while node creation is in progress.
     */
        isNodeActionInProgress: false,
    },
    reducers: {
        buildTmpNode,
        updateNodeState,
        deleteNodeFromState,
        setSelectedNode,
        setNodePaneContent,
        searchNode,
        importNode,
        reorderNodes,
        replaceTmpNodeWithPersistedNode,
        clearTmpNode,
        setIsNodeActionInProgress: (state, action) => {
            state.isNodeActionInProgress = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(indexNodes.fulfilled, indexNodesFulfilledReducer)
            .addCase(showNode.fulfilled, showNodeFulfilledReducer)
            .addCase(createNode.fulfilled, createNodeFulfilledReducer)
            .addCase(deleteNode.fulfilled, (state, action) => deleteNodeFromState(state, action))
            .addCase(getNodeDescription.fulfilled, getNodeDescriptionFulfilled)
            .addCase(getNodeDescriptionBase64.fulfilled, getNodeDescriptionBase64Fulfilled)
            .addCase(getLikesCount.fulfilled, likeNodeFulfilledReducer)
            .addCase(likeNode.fulfilled, likeNodeFulfilledReducer)
            .addCase(unlikeNode.fulfilled, likeNodeFulfilledReducer);
    },
});

export const { actions } = nodesSlice;
export default nodesSlice.reducer;
