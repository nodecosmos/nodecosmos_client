import landingPageNodes from './landingPageNodes';
import { createSlice } from '@reduxjs/toolkit';

export const NEW_NODE_ID = 'NEW_NODE_ID';

const isNewNode = (id) => id === NEW_NODE_ID;

const nodeSlice = createSlice({
    name: 'landingPageNodes',
    initialState: landingPageNodes,
    reducers: {
        expandNode(state, action) { state[action.payload.id].expanded = true; },
        collapseNode(state, action) { if (!isNewNode(action.payload.id)) state[action.payload.id].expanded = false; },
        updateNodePosition(state, action) {
            if (state[action.payload.id]) {
                state[action.payload.id].position = action.payload.position;
            }
        },
        updateNodePositionYEnds(state, action) { state[action.payload.id].position.yEnds = action.payload.yEnds; },
        incrementNodesYEnds(state, action) {
            const { ids, increment } = action.payload;
            ids.forEach((id) => {
                if (state[id]) state[id].position.yEnds += increment;
            });
        },
        deleteNodeFromState(state, action) {
            const node = state[action.payload.id];
            const parent = state[node.parent_id];

            parent.node_ids = parent.node_ids.filter((objectId) => objectId.$oid !== node.id);
            delete state[node.id];
        },
        terminateNewNode(state) {
            if (state[NEW_NODE_ID]) {
                nodeSlice.caseReducers.deleteNodeFromState(state, { payload: { id: NEW_NODE_ID } });
            }
        },
        updateNode(state, action) {
            const { id } = action.payload;
            if (state[id]) {
                state[id] = {
                    ...state[id],
                    ...action.payload, 
                };
            }
        },
        openDescription(state, action) {
            const { id } = action.payload;
            if (state[id]) {
                state[id].isDescriptionOpen = true;
            }
        },
        closeDescription(state, action) {
            const { id } = action.payload;
            if (state[id]) {
                state[id].isDescriptionOpen = false;
            }
        },
        prependNewNode: (state, action) => {
            const parentId = action.payload.parent_id;

            if (!parentId || parentId === NEW_NODE_ID) return;

            const parent = state[parentId];
            const randomId = (Math.random() + 1).toString(36)
                .substring(7);
            const id = randomId;

            const nodeAncestorIdObjects = action.payload.ancestor_ids || parent.ancestor_ids.length
                ? [{ $oid: parentId }, ...parent.ancestor_ids] : [{ $oid: parentId }];

            state[id] = {
                id,
                isNew: true,
                isEditing: true,
                fetched: false,
                parent_id: parentId,
                ancestor_ids: nodeAncestorIdObjects,
                node_ids: [],
                position: { y: 0 },
                owner: { username: '' },
                ...action.payload,
            };

            parent.node_ids.push({ $oid: id });

            setTimeout(() => updateNode({
                payload: {
                    id,
                    isNew: false,
                },
            }));
        },

        deprecateNodesFetchedState(state) {
            Object.keys(state).forEach((id) => {
                const node = state[id];
                if (node.fetched) node.fetched = false;
            });
        },
    },
});

const { actions, reducer } = nodeSlice;

export const {
    expandNode,
    collapseNode,
    updateNodePosition,
    incrementNodesYEnds,
    updateNodePositionYEnds,
    terminateNewNode,
    prependNewNode,
    deleteNodeFromState,
    deprecateNodesFetchedState,
    updateNode,
    openDescription,
    closeDescription,
} = actions;

export default reducer;
