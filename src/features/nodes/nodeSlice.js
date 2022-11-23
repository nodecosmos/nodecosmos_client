import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

export const NEW_NODE_ID = 'NEW_NODE_ID';

export const indexNodes = createAsyncThunk(
  'nodes/indexNodes',
  async (_, _thunkAPI) => {
    const response = await nodecosmos.get('/nodes');
    return response.data;
  },
);

export const showNode = createAsyncThunk(
  'nodes/showNode',
  async (id, _thunkAPI) => {
    const response = await nodecosmos.get(`/nodes/${id}`);
    return response.data;
  },
);

export const createNode = createAsyncThunk(
  'nodes/createNode',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/nodes.json', payload);

    return response.data;
  },
);

export const updateNode = createAsyncThunk(
  'nodes/updateNode',
  async (payload, _thunk) => {
    const { id } = payload;
    const response = await nodecosmos.put(`/nodes/${id}.json`, payload);

    return response.data;
  },
);

export const deleteNode = createAsyncThunk(
  'nodes/deleteNode',
  async (id, _thunkAPI) => {
    const response = await nodecosmos.delete(`/nodes/${id}`);

    return response.data;
  },
);

const isNewNode = (id) => id === NEW_NODE_ID;

const mapNodesToState = (state, nodes) => {
  nodes.forEach((payload) => {
    const { id } = payload;

    payload.node_ids = payload.node_ids || [];
    payload.ancestor_ids = payload.ancestor_ids || [];
    payload.position = payload.position || {};

    state[id] = payload;
  });
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: {},
  reducers: {
    expandNode(state, action) { state[action.payload.id].expanded = true; },
    collapseNode(state, action) { if (!isNewNode(action.payload.id)) state[action.payload.id].expanded = false; },
    updateNodePosition(state, action) { state[action.payload.id].position = action.payload.position; },
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
    terminateNewNode(state, _action) {
      if (state[NEW_NODE_ID]) {
        nodeSlice.caseReducers.deleteNodeFromState(state, { payload: { id: NEW_NODE_ID } });
      }
    },
    prependNewNode: (state, action) => {
      const parentId = action.payload.parent_id;

      if (!parentId || parentId === NEW_NODE_ID) return;

      const parent = state[parentId];
      const id = action.payload.id || NEW_NODE_ID;

      const nodeAncestorIdObjects = action.payload.ancestor_ids || parent.ancestor_ids.length
        ? [{ $oid: parentId }, ...parent.ancestor_ids] : [{ $oid: parentId }];

      state[id] = {
        id,
        isNew: id === NEW_NODE_ID,
        fetched: id !== NEW_NODE_ID,
        parent_id: parentId,
        ancestor_ids: nodeAncestorIdObjects,
        node_ids: [],
        position: { y: 0 },
        owner: {
          username: '',
        },
        ...action.payload,
      };

      parent.node_ids.push({ $oid: id });
    },
    deprecateNodesFetchedState(state, _action) {
      Object.keys(state).forEach((id) => {
        const node = state[id];
        if (node.fetched) node.fetched = false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => mapNodesToState(state, action.payload))
      .addCase(showNode.fulfilled, (state, action) => {
        mapNodesToState(state, [{ ...action.payload }]);
        mapNodesToState(state, action.payload.all_nested_nodes);
      })
      .addCase(createNode.fulfilled, (state, action) => {
        nodeSlice.caseReducers.terminateNewNode(state, action);
        nodeSlice.caseReducers.prependNewNode(state, action);
      })
      .addCase(deleteNode.fulfilled, (state, action) => {
        nodeSlice.caseReducers.deleteNodeFromState(state, action);
      });
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
} = actions;

export default reducer;
