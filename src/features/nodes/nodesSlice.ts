import {
    create,
    deleteNode,
    indexNodes,
    reorder,
    showBranchNode,
    showNode,
} from './nodes.thunks';
import {
    DragAndDrop, NodePaneContent, NodePrimaryKey, NodeState, TreeDensity,
} from './nodes.types';
import indexNodesFulfilled from './reducers';
import createFulfilled from './reducers/create';
import { deleteFromState, deleteFulfilled } from './reducers/delete';
import {
    getLikeCountFulfilled, likeObjectFulfilled, unlikeObjectFulfilled,
} from './reducers/like';
import reorderFulfilled from './reducers/reorder';
import search from './reducers/search';
import select from './reducers/select';
import showFulfilled from './reducers/show';
import { buildTmpNode, replaceTmpNodeWithPersisted } from './reducers/tmp';
import updateState from './reducers/update';
import { UUID } from '../../types';
import {
    getLikeCount, likeObject, unlikeObject,
} from '../likes/likes.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const parseScaleFromLS = () => {
    const scale = localStorage.getItem('treeScale');

    if (!scale) return 1;

    return parseFloat(scale);
};

const parseDensityFromLS = () => {
    const density = localStorage.getItem('treeDensity');

    if (!density) return TreeDensity.Default;

    return density as TreeDensity;
};

const initialState: NodeState = {
    byBranchId: {},
    childIds: {},
    titles: {},
    selected: null,
    nodePaneContent: NodePaneContent.Description,
    indexNodesById: {},
    saveInProgress: false,
    dragAndDrop: null,
    justCreatedNodeId: null,
    scrollTo: null,
    expandedNodes: new Set(),
    scale: parseScaleFromLS(),
    treeDensity: parseDensityFromLS(),
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
            delete state.titles[branchId];
        },
        setNodeScrollTo: (state: NodeState, action: PayloadAction<UUID | null>) => {
            state.scrollTo = action.payload;
        },
        expandNode: (state: NodeState, action: PayloadAction<UUID>) => {
            state.expandedNodes.add(action.payload);
        },
        collapseNode: (state: NodeState, action: PayloadAction<UUID>) => {
            state.expandedNodes.delete(action.payload);
        },
        selectNodeFromParams: (state: NodeState, action: PayloadAction<NodePrimaryKey>) => {
            const { branchId, id } = action.payload;
            const branchNodes = state.byBranchId[branchId];

            if (!branchNodes) return;

            const node = branchNodes[id];

            if (node) {
                state.expandedNodes.add(id);

                node.ancestorIds.forEach((ancestorId) => {
                    state.expandedNodes.add(ancestorId);
                });

                state.byBranchId[branchId][id].isSelected = true;
                state.selected = {
                    branchId,
                    id,
                };
            }
        },
        setScale: (state: NodeState, action: PayloadAction<number>) => {
            state.scale = action.payload;

            localStorage.setItem('treeScale', action.payload.toString());
        },
        setDensity: (state: NodeState, action: PayloadAction<TreeDensity>) => {
            state.treeDensity = action.payload;

            localStorage.setItem('treeDensity', action.payload);
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
            .addCase(getLikeCount.fulfilled, getLikeCountFulfilled)
            .addCase(likeObject.fulfilled, likeObjectFulfilled)
            .addCase(unlikeObject.fulfilled, unlikeObjectFulfilled);
    },
});

export const { actions } = nodesSlice;

export default nodesSlice.reducer;
