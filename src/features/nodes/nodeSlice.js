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
    payload.position = payload.position || {};

    state[id] = payload;
  });
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: {},
  reducers: {
    expandNode(state, action) {
      state[action.payload.id].isExpanded = true;
    },
    collapseNode(state, action) {
      state[action.payload.id].isExpanded = false;
    },
    updateNodeState(state, action) {
      const { id } = action.payload;
      if (state[id]) {
        state[id] = { ...state[id], ...action.payload };
      }
    },
    incrementNodesYEnds(state, action) {
      const {
        ids,
        increment,
      } = action.payload;
      ids.forEach((id) => {
        if (state[id]) state[id].position.yEnds += increment;
      });
    },
    deleteNodeFromState(state, action) {
      const node = state[action.payload.id];
      const parent = state[node.parent_id];

      if (parent) parent.node_ids = parent.node_ids.filter((objectId) => objectId.$oid !== node.id);

      delete state[node.id];
    },
    addNewNode(state, action) {
      const parentId = action.payload.parent_id;

      const parent = state[parentId];
      const id = action.payload.id || (Math.random() + 1).toString(36);

      const nodeAncestorIdObjects = action.payload.ancestor_ids || parent.ancestor_ids.length
        ? [{ $oid: parentId }, ...parent.ancestor_ids] : [{ $oid: parentId }];

      // new persistent node is in edit mode only if tempNode is in edit mode
      const isEditing = !action.payload.tempId || state[action.payload.tempId].isEditing;

      state[id] = {
        id,
        isTemp: action.payload.isTemp,
        replaceTempNode: action.payload.replaceTempNode, // we don't animate the new node if it's replacing a temp node
        isEditing,
        parent_id: parentId,
        ancestor_ids: nodeAncestorIdObjects,
        node_ids: [],
        position: { y: 0 },
        owner: {
          username: '',
        },
        ...action.payload,
      };

      if (action.payload.isTemp) {
        // add the new node to the parent's node_ids
        parent.node_ids.push({ $oid: id });
      } else {
        // replace the temp new node with the permanent new node
        parent.node_ids = parent.node_ids.map((objectId) => {
          if (objectId.$oid === action.payload.tempId) return { $oid: id };
          return objectId;
        });
        // delete the temp new node
        delete state[action.payload.tempId];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => mapNodesToState(state, action.payload))
      .addCase(showNode.fulfilled, (state, action) => {
        mapNodesToState(state, [{ ...action.payload }]);
        mapNodesToState(state, action.payload.all_nested_nodes);
      })
      .addCase(createNode.fulfilled, (state, action) => {
        nodeSlice.caseReducers.addNewNode(state, {
          payload: {
            ...action.payload,
            replaceTempNode: true,
          },
        });

        setTimeout(() => nodeSlice.caseReducers.updateNodeState(state, {
          payload: {
            ...action.payload,
            replaceTempNode: false,
          },
        }), 0);
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
  incrementNodesYEnds,
  addNewNode,
  updateNodeState,
} = actions;

export default reducer;
