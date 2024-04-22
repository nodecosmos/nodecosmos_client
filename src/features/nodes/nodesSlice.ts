import {
    create,
    deleteNode,
    indexNodes,
    reorder,
    showBranchNode,
    showNode,
} from './nodes.thunks';
import {
    DragAndDrop, NodePaneContent, NodeState,
} from './nodes.types';
import indexNodesFulfilled from './reducers';
import createFulfilled from './reducers/create';
import { deleteFromState, deleteFulfilled } from './reducers/delete';
import {
    getLikesCountFulfilled, likeObjectFulfilled, unlikeObjectFulfilled,
} from './reducers/like';
import reorderFulfilled from './reducers/reorder';
import search from './reducers/search';
import select from './reducers/select';
import showFulfilled from './reducers/show';
import { buildTmpNode, replaceTmpNodeWithPersisted } from './reducers/tmp';
import updateState from './reducers/update';
import { UUID } from '../../types';
import {
    getLikesCount, likeObject, unlikeObject,
} from '../likes/likes.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: NodeState = {
    byBranchId: {},
    childIds: {},
    positions: {},
    titles: {},
    selected: null,
    nodePaneContent: NodePaneContent.Description,
    indexNodesById: {},
    saveInProgress: false,
    dragAndDrop: null,
    justCreatedNodeId: null,
};

const nodesSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        buildTmpNode,
        replaceTmpNodeWithPersisted,
        updateState,
        deleteFromState,
        select,
        search,
        setNodePaneContent(state: NodeState, action: PayloadAction<NodePaneContent>) {
            state.nodePaneContent = action.payload;
        },
        setSaveInProgress: (state: NodeState, action: PayloadAction<boolean>) => {
            state.saveInProgress = action.payload;
        },
        setDragAndDrop: (state: NodeState, action: PayloadAction<DragAndDrop | null>) => {
            state.dragAndDrop = action.payload;
        },
        clearJustCreatedNode: (state: NodeState) => {
            state.justCreatedNodeId = null;
        },
        clearNodeBranchData: (state: NodeState, action: PayloadAction<UUID>) => {
            const branchId = action.payload;

            delete state.byBranchId[branchId];
            delete state.childIds[branchId];
            delete state.positions[branchId];
            delete state.titles[branchId];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(indexNodes.fulfilled, indexNodesFulfilled)
            .addCase(showNode.fulfilled, showFulfilled)
            .addCase(showBranchNode.fulfilled, showFulfilled)
            .addCase(create.fulfilled, createFulfilled)
            .addCase(deleteNode.fulfilled, deleteFulfilled)
            .addCase(reorder.fulfilled, reorderFulfilled)
            .addCase(getLikesCount.fulfilled, getLikesCountFulfilled)
            .addCase(likeObject.fulfilled, likeObjectFulfilled)
            .addCase(unlikeObject.fulfilled, unlikeObjectFulfilled);
    },
});

export const { actions } = nodesSlice;

export default nodesSlice.reducer;
