import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

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

const mapNodesToState = (state, nodes) => {
  nodes.forEach((payload) => {
    const { id } = payload;

    payload.node_ids = payload.node_ids || [];
    payload.position = payload.position || {};

    state[id] = payload;
  });
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: {},
  reducers: {
    expandNode(state, action) { state[action.payload.id].expanded = true; },
    collapseNode(state, action) { state[action.payload.id].expanded = false; },
    nodeIsVisible(state, action) { state[action.payload.id].visible = true; },
    nodeIsNotVisible(state, action) { state[action.payload.id].visible = false; },
    /* position */
    updateNodePosition(state, action) {
      state[action.payload.id].position = action.payload.position;
    },
    updateNodePositionYEnds(state, action) {
      state[action.payload.id].position.yEnds = action.payload.yEnds;
    },
    incrementNodesYEnds(state, action) {
      const { ids, increment } = action.payload;
      ids.forEach((id) => {
        state[id].position.yEnds += increment;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => mapNodesToState(state, action.payload))
      .addCase(showNode.fulfilled, (state, action) => {
        mapNodesToState(state, [{ ...action.payload, fetched: true }]);
        mapNodesToState(state, action.payload.all_nested_nodes);
      });
  },
});

const { actions, reducer } = nodeSlice;

export const {
  expandNode,
  collapseNode,
  nodeIsVisible,
  nodeIsNotVisible,
  updateNodePosition,
  incrementNodesYEnds,
  updateNodePositionYEnds,
} = actions;

export default reducer;
