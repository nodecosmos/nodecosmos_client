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
import { selectNodeFromParams } from './nodes.utils';
import indexNodesFulfilled from './reducers';
import createFulfilled from './reducers/create';
import { deleteFromState, deleteFulfilled } from './reducers/delete';
import {
    getLikeCountFulfilled, getLikeCountRejected, likeObjectFulfilled, unlikeObjectFulfilled,
} from './reducers/like';
import reorderFulfilled from './reducers/reorder';
import search from './reducers/search';
import select from './reducers/select';
import showFulfilled, { showNodeRejected } from './reducers/show';
import { buildTmpNode, replaceTmpNodeWithPersisted } from './reducers/tmp';
import updateState from './reducers/update';
import { UUID } from '../../types';
import { clearSelectedObject } from '../app/app.thunks';
import { getDescription } from '../descriptions/descriptions.thunks';
import {
    getLikeCount, likeObject, unlikeObject,
} from '../likes/likes.thunks';
import { showUserByUsername } from '../users/users.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const TREE_SCALE_LS_KEY = 'TS';
export const RECENT_NODES_LS_KEY = 'RNI';
const RECENT_NODES_MAX = 50;

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

const parseRecentNodesFromLS = () => {
    const recentNodes = localStorage.getItem(RECENT_NODES_LS_KEY);

    if (recentNodes) {
        return JSON.parse(recentNodes);
    }

    return [];
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
    recentNodes: parseRecentNodesFromLS(),
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
        pushRecentNode: (state: NodeState, action: PayloadAction<[UUID, UUID]>) => {
            const [branchId, id] = action.payload;
            // insert at the beginning, remove if already exists
            state.recentNodes = state.recentNodes.filter(
                (node) => node.id !== id,
            );

            if (!state.byBranchId[branchId]?.[id]) return;

            const recentNode = {
                branchId,
                id,
                title: state.byBranchId[branchId][id].title,
                nestedLevel: state.byBranchId[branchId][id].ancestorIds.length,
            };

            state.recentNodes.unshift(recentNode);

            if (state.recentNodes.length > RECENT_NODES_MAX) {
                state.recentNodes.shift();
            }

            localStorage.setItem(RECENT_NODES_LS_KEY, JSON.stringify(state.recentNodes));
        },

        selectNodeFromParams: (state: NodeState, action: PayloadAction<NodePrimaryKey>) => {
            selectNodeFromParams(state, action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(indexNodes.fulfilled, indexNodesFulfilled)
            .addCase(showNode.fulfilled, showFulfilled)
            .addCase(showNode.rejected, showNodeRejected)
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
            })
            .addCase(getDescription.fulfilled, (state: NodeState, action) => {
                const { branchId, objectId } = action.meta.arg;
                const { coverImageUrl } = action.payload;

                if (coverImageUrl && state.byBranchId[branchId] && state.byBranchId[branchId][objectId]) {
                    state.byBranchId[branchId][objectId].coverImageUrl = coverImageUrl;
                }
            })
            .addCase(clearSelectedObject.fulfilled, (state: NodeState, action) => {
                state.selected = null;

                if (action.payload) {
                    const { branchId, objectId } = action.payload;

                    if (state.byBranchId?.[branchId]?.[objectId]) {
                        state.byBranchId[branchId][objectId].isSelected = false;
                    }
                }
            });
    },
});

export const { actions } = nodesSlice;

export default nodesSlice.reducer;
