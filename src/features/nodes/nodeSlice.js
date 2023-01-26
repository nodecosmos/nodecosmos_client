import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';
import history from '../../history';

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
    try {
      const response = await nodecosmos.get(`/nodes/${id}`);
      return response.data;
    } catch (error) {
      history.push('/404');
      return null;
    }
  },
);

export const createNode = createAsyncThunk(
  'nodes/createNode',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/nodes.json', payload);

    return {
      ...response.data,
      tempId: payload.tempId,
    };
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

const mapNodesToState = (state, nodes) => {
  nodes.forEach((payload) => {
    const { id } = payload;

    payload.node_ids = payload.node_ids || [];
    payload.ancestor_ids = payload.ancestor_ids || [];

    state.byId[id] = payload;
  });
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: {
    byId: {},
    positionsById: {},
  },
  reducers: {
    deleteAllNestedNodesFromState(state, action) { delete state.byId[action.payload.id].all_nested_nodes; },
    expandNode(state, action) { state.byId[action.payload.id].isExpanded = true; },
    collapseNode(state, action) { state.byId[action.payload.id].isExpanded = false; },
    mountNodes(state, action) { action.payload.ids.forEach((id) => { state.byId[id].isMounted = true; }); },
    unmountNodes(state, action) { action.payload.ids.forEach((id) => { state.byId[id].isMounted = false; }); },
    setCurrentNode(state, action) {
      const id = action.payload;

      const prevCurrentNode = Object.values(state.byId).find((node) => node.isCurrent);
      if (prevCurrentNode) prevCurrentNode.isCurrent = false;

      if (id) state.byId[id].isCurrent = true;
    },
    updateNodeState(state, action) {
      const { id } = action.payload;
      if (state.byId[id]) {
        state.byId[id] = { ...state.byId[id], ...action.payload };
      }
    },
    deleteNodeFromState(state, action) {
      const node = state.byId[action.payload.id];
      const parent = state.byId[node.parent_id];

      if (parent) parent.node_ids = parent.node_ids.filter((id) => id !== node.id);

      delete state.byId[node.id];
    },
    addNewNode(state, action) {
      const parentId = action.payload.parent_id;

      const parent = state.byId[parentId];
      const id = action.payload.id || (Math.random() + 1).toString(36);

      const nodeAncestorIds = action.payload.ancestor_ids || parent.ancestor_ids.length
        ? [parentId, ...parent.ancestor_ids] : [parentId];

      // new persistent node is in edit mode only if tempNode is in edit mode
      const isEditing = action.payload.isTemp || (state.byId[action.payload.tempId]?.isEditing);

      state.byId[id] = {
        id,
        isTemp: action.payload.isTemp,
        replaceTempNode: action.payload.replaceTempNode, // we don't animate the new node if it's replacing a temp node
        isEditing,
        parent_id: parentId,
        ancestor_ids: nodeAncestorIds,
        node_ids: [],
        owner: {
          username: '',
        },
        ...action.payload,
      };

      if (action.payload.isTemp) {
        // add the new node to the parent's node_ids
        parent.node_ids.push(id);
      } else if (action.payload.replaceTempNode) {
        // replace the temp new node with the permanent new node
        parent.node_ids = parent.node_ids.map((nestedNodeId) => {
          if (nestedNodeId === action.payload.tempId) return id;
          return nestedNodeId;
        });
        // delete the temp new node
        delete state.byId[action.payload.tempId];
      }
    },
    setPositionsById(state, action) {
      state.positionsById = action.payload;
    },
    setPositionById(state, action) {
      const { id, position } = action.payload;
      state.positionsById[id] = position;
    },
    updateNodesY(state, action) {
      const {
        ids,
        change,
      } = action.payload;

      ids.forEach((id) => {
        state.positionsById[id].yEnds += change;
        state.positionsById[id].y += change;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => mapNodesToState(state, action.payload))
      .addCase(showNode.fulfilled, (state, action) => {
        mapNodesToState(state, [{ ...action.payload, isMounted: true, isRoot: true }]);
        mapNodesToState(state, action.payload.all_nested_nodes);
        nodeSlice.caseReducers.deleteAllNestedNodesFromState(state, action);
      })
      .addCase(createNode.fulfilled, (state, action) => {
        nodeSlice.caseReducers.addNewNode(state, {
          payload: {
            ...action.payload,
            replaceTempNode: true,
          },
        });
      })
      .addCase(deleteNode.fulfilled, (state, action) => {
        nodeSlice.caseReducers.deleteNodeFromState(state, action);
      });
  },
});

const {
  actions,
  reducer,
} = nodeSlice;

export const {
  expandNode,
  collapseNode,
  mountNodes,
  unmountNodes,
  setCurrentNode,
  updateNodeState,
  deleteNodeFromState,
  addNewNode,
  setPositionsById,
  setPositionById,
} = actions;

export default reducer;
