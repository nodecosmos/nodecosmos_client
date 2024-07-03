import {
    create, deleteEditor,
    deleteNode,
    indexNodes,
    reorder,
    showBranchNode,
    showNode,
} from './nodes.thunks';
import {
    DragAndDrop, NodePrimaryKey, NodeState, TreeDensity,
} from './nodes.types';
import indexNodesFulfilled from './reducers';
import createFulfilled from './reducers/create';
import { deleteFromState, deleteFulfilled } from './reducers/delete';
import {
    getLikeCountFulfilled, getLikeCountRejected, likeObjectFulfilled, unlikeObjectFulfilled,
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
import { showUserByUsername } from '../users/users.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const TREE_SCALE_LS_KEY = 'TS';

const parseScaleFromLS = () => {
    const scale = localStorage.getItem(TREE_SCALE_LS_KEY);

    if (scale) {
        return parseFloat(scale);
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    return isMobile ? 0.8 : 1;
};

const parseDensityFromLS = () => {
    const density = localStorage.getItem('treeDensity');

    if (!density) return TreeDensity.Default;

    return density as TreeDensity;
};

const parseShowAncestorChainFromLS = () => {
    const showAncestorChain = localStorage.getItem('showAncestorChain');

    return showAncestorChain === 'true';
};

const initialState: NodeState = {
    byBranchId: {},
    childIds: {},
    titles: {},
    selected: null,
    indexNodesById: {},
    saveInProgress: false,
    dragAndDrop: null,
    justCreatedNodeId: null,
    scrollTo: null,
    expandedNodes: new Set(),
    scale: parseScaleFromLS(),
    treeDensity: parseDensityFromLS(),
    showAncestorChain: parseShowAncestorChainFromLS(),
    indexSearchTerm: undefined,
    sidebarOpen: false,
    byOwnerId: {},
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
        setSidebarOpen: (state: NodeState, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload;
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

                if (state.selected) {
                    const { branchId: selectedBranchId, id: selectedId } = state.selected;

                    if (branchId !== selectedBranchId || id !== selectedId) {
                        state.byBranchId[selectedBranchId][selectedId].isSelected = false;
                    }
                }

                state.byBranchId[branchId][id].isSelected = true;
                state.selected = {
                    branchId,
                    id,
                };
            }
        },
        setScale: (state: NodeState, action: PayloadAction<number>) => {
            state.scale = action.payload;

            localStorage.setItem(TREE_SCALE_LS_KEY, action.payload.toString());
        },
        setDensity: (state: NodeState, action: PayloadAction<TreeDensity>) => {
            state.treeDensity = action.payload;

            localStorage.setItem('treeDensity', action.payload);
        },
        setShowAncestorChain: (state: NodeState, action: PayloadAction<boolean>) => {
            state.showAncestorChain = action.payload;

            localStorage.setItem('showAncestorChain', action.payload.toString());
        },
        setIndexSearchTerm: (state: NodeState, action: PayloadAction<string | undefined>) => {
            state.indexSearchTerm = action.payload;
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
            .addCase(getLikeCount.rejected, getLikeCountRejected)
            .addCase(likeObject.fulfilled, likeObjectFulfilled)
            .addCase(unlikeObject.fulfilled, unlikeObjectFulfilled)
            .addCase(deleteEditor.fulfilled, (state: NodeState, action: ReturnType<typeof deleteEditor.fulfilled>) => {
                const { branchId, id } = action.meta.arg;
                const node = state.byBranchId[branchId][id];
                node.editorIds?.delete(action.meta.arg.editorId);
            })
            .addCase(showUserByUsername.fulfilled, (state: NodeState, action) => {
                const { user, rootNodes } = action.payload;

                state.byOwnerId[user.id] = rootNodes;
            });
    },
});

export const { actions } = nodesSlice;

export default nodesSlice.reducer;
