import {
    createNode,
    deleteNode,
    getNodeDescription,
    getNodeDescriptionBase64,
    indexNodes,
    showNode,
} from './nodes.thunks';
import { NodePaneContents, NodeState } from './nodes.types';
import indexNodesFulfilled from './reducers';
import createFulfilled from './reducers/create';
import { deleteFulfilled, deleteFromState } from './reducers/delete';
import { getNodeDescriptionBase64Fulfilled, getNodeDescriptionFulfilled } from './reducers/description';
import { getLikesCountFulfilled, likeObjectFulfilled } from './reducers/like';
import { collapseNode, expandNode } from './reducers/mounter';
import reorder from './reducers/reorder';
import search from './reducers/search';
import select from './reducers/select';
import showFulfilled from './reducers/show';
import {
    buildTmpNode, clearTmp, replaceTmpWithPersisted,
} from './reducers/tmp';
import updateState from './reducers/update';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../likes/likes.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: NodeState = {
    byBranchId: {},
    childIds: {},
    orderedTreeIds: {},
    titles: {},
    selectedNodePrimaryKey: null,
    nodePaneContent: NodePaneContents.Markdown,
    indexNodesById: {},
    actionInProgress: false,
    dragAndDrop: null,
};

const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        buildTmpNode,
        updateState,
        deleteFromState,
        select,
        search,
        reorder,
        replaceTmpWithPersisted,
        clearTmp,
        expandNode,
        collapseNode,
        setNodePaneContent(state: NodeState, action: PayloadAction<NodePaneContents>) {
            state.nodePaneContent = action.payload;
        },
        setActionInProgress: (state: NodeState, action: PayloadAction<boolean>) => {
            state.actionInProgress = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(indexNodes.fulfilled, indexNodesFulfilled)
            .addCase(showNode.fulfilled, showFulfilled)
            .addCase(createNode.fulfilled, createFulfilled)
            .addCase(deleteNode.fulfilled, deleteFulfilled)
            .addCase(getNodeDescription.fulfilled, getNodeDescriptionFulfilled)
            .addCase(getNodeDescriptionBase64.fulfilled, getNodeDescriptionBase64Fulfilled)
            .addCase(getLikesCount.fulfilled, getLikesCountFulfilled)
            .addCase(likeObject.fulfilled, likeObjectFulfilled)
            .addCase(unlikeObject.fulfilled, likeObjectFulfilled);
    },
});

export const { actions } = nodesSlice;

export default nodesSlice.reducer;
