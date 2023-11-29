import {
    create,
    deleteNode,
    getDescription,
    getDescriptionBase64,
    indexNodes,
    reorder,
    showNode,
} from './nodes.thunks';
import {
    DragAndDrop, NodePaneContent, NodeState,
} from './nodes.types';
import indexNodesFulfilled from './reducers';
import createFulfilled from './reducers/create';
import { deleteFulfilled, deleteFromState } from './reducers/delete';
import { getDescriptionBase64Fulfilled, getDescriptionFulfilled } from './reducers/description';
import { getLikesCountFulfilled, likeObjectFulfilled } from './reducers/like';
import reorderFulfilled from './reducers/reorder';
import search from './reducers/search';
import select from './reducers/select';
import showFulfilled from './reducers/show';
import {
    buildTmpNode, replaceTmpWithPersisted,
} from './reducers/tmp';
import { expandNode, collapseNode } from './reducers/tree';
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
    selected: null,
    nodePaneContent: NodePaneContent.Markdown,
    indexNodesById: {},
    actionInProgress: false,
    dragAndDrop: null,
    currentTmpNode: null,
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
        replaceTmpWithPersisted,
        expandNode,
        collapseNode,
        setNodePaneContent(state: NodeState, action: PayloadAction<NodePaneContent>) {
            state.nodePaneContent = action.payload;
        },
        setActionInProgress: (state: NodeState, action: PayloadAction<boolean>) => {
            state.actionInProgress = action.payload;
        },
        setDragAndDrop: (state: NodeState, action: PayloadAction<DragAndDrop | null>) => {
            state.dragAndDrop = action.payload;
        },
        clearCurrentTmpNode: (state: NodeState) => {
            state.currentTmpNode = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(indexNodes.fulfilled, indexNodesFulfilled)
            .addCase(showNode.fulfilled, showFulfilled)
            .addCase(create.fulfilled, createFulfilled)
            .addCase(deleteNode.fulfilled, deleteFulfilled)
            .addCase(reorder.fulfilled, reorderFulfilled)
            .addCase(getDescription.fulfilled, getDescriptionFulfilled)
            .addCase(getDescriptionBase64.fulfilled, getDescriptionBase64Fulfilled)
            .addCase(getLikesCount.fulfilled, getLikesCountFulfilled)
            .addCase(likeObject.fulfilled, likeObjectFulfilled)
            .addCase(unlikeObject.fulfilled, likeObjectFulfilled);
    },
});

export const { actions } = nodesSlice;

export default nodesSlice.reducer;
