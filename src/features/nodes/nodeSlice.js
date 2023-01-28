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

    payload.ancestorIds = payload.ancestor_ids || [];
    payload.descendantIds = payload.descendant_ids || [];

    state.nestedNodesByParentId[id] = payload.node_ids;
    state.mountedTreeNodesById[id] = payload.isMounted || false;

    state.byId[id] = payload;
  });
};

const nodeSlice = createSlice({
  name: 'nodes',
  initialState: {
    byId: {},
    positionsById: {},
    mountedTreeNodesById: {},
    expandedTreeNodesById: {},
    nestedNodesByParentId: {},
  },
  reducers: {
    deleteRootDescendantArray(state, action) { delete state[action.payload.id].descendants; },
    expandNode(state, action) {
      const { id } = action.payload;

      state.expandedTreeNodesById[id] = true;

      const { descendantIds } = state.byId[id];

      nodeSlice.caseReducers.mountNodes(state, { payload: descendantIds });
    },
    collapseNode(state, action) {
      const { id } = action.payload;

      state.expandedTreeNodesById[id] = false;

      const { descendantIds } = state.byId[id];

      nodeSlice.caseReducers.unmountNodes(state, { payload: descendantIds });
    },
    mountNodes(state, action) {
      action.payload.forEach((id) => {
        const node = state.byId[id];
        const areAncestorsExpanded = node.ancestorIds.every(
          (ancestorId) => !state.byId[ancestorId] || state.expandedTreeNodesById[ancestorId],
        );
        if (areAncestorsExpanded) state.mountedTreeNodesById[id] = true;
      });
    },
    unmountNodes(state, action) { action.payload.forEach((id) => { state.mountedTreeNodesById[id] = false; }); },
    setCurrentNode(state, action) {
      // This was more efficient if 1000s of nodes were being rendered at once as it doesn't trigger re-rendered.
      // However, not sure if it's needed as tree is now virtualized.
      const { id } = action.payload;

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

      if (parent) {
        state.nestedNodesByParentId[parent.id] = state.nestedNodesByParentId[parent.id].filter((id) => id !== node.id);
      }

      delete state.positionsById[node.id];
      delete state.mountedTreeNodesById[node.id];
      delete state.expandedTreeNodesById[node.id];
      delete state.byId[node.id];
    },
    addNewNode(state, action) {
      const parentId = action.payload.parent_id;

      const parent = state.byId[parentId];
      const id = action.payload.id || (Math.random() + 1).toString(36); // automatic id for tmp node

      const nodeAncestorIds = action.payload.ancestorIds || parent.ancestorIds.length
        ? [parentId, ...parent.ancestorIds] : [parentId];

      const isEditing = action.payload.isTemp || state.byId[action.payload.tempId]?.isEditing;

      state.mountedTreeNodesById[id] = true;
      state.expandedTreeNodesById[id] = state.expandedTreeNodesById[action.payload.tempId] || false;
      state.nestedNodesByParentId[id] = [];

      state.byId[id] = {
        id,
        isEditing,
        isTemp: action.payload.isTemp,
        isReplacingTempNode: action.payload.isReplacingTempNode,
        parent_id: parentId,
        ancestorIds: nodeAncestorIds,
        nodeIds: [],
        descendantIds: [],
        owner: {
          username: '',
        },
        ...action.payload,
      };

      if (action.payload.isTemp) {
        state.nestedNodesByParentId[parentId].push(id);
        nodeAncestorIds.forEach((ancestorId) => {
          if (state.byId[ancestorId]) state.byId[ancestorId].descendantIds.push(id);
        });
      } else if (action.payload.isReplacingTempNode) {
        // replace the temp new node with the permanent new node in parent
        state.nestedNodesByParentId[parentId] = state.nestedNodesByParentId[parentId].map((nestedNodeId) => {
          if (nestedNodeId === action.payload.tempId) return id;
          return nestedNodeId;
        });

        // replace the temp new node with the permanent new node in ancestors
        nodeAncestorIds.forEach((ancestorId) => {
          const ancestor = state.byId[ancestorId];
          if (ancestor) {
            ancestor.descendantIds = ancestor.descendantIds.map((descendantId) => {
              if (descendantId === action.payload.tempId) return id;
              return descendantId;
            });
          }
        });

        // add tmp node position to new node
        const position = state.positionsById[action.payload.tempId];
        if (position) state.positionsById[id] = position;

        // delete the temp new node from state
        delete state.positionsById[action.payload.tempId];
        delete state.mountedTreeNodesById[action.payload.tempId];
        delete state.expandedTreeNodesById[action.payload.tempId];
        delete state.byId[action.payload.tempId];
      }
    },
    // re-enable animations for new node
    deprecateReplaceTempNodeStatus(state, _action) {
      const id = Object.keys(state.byId).find((currentId) => state.byId[currentId].isReplacingTempNode);
      if (id) state.byId[id].isReplacingTempNode = false;
    },
    setPositionsById(state, action) { state.positionsById = action.payload; },
  },
  extraReducers(builder) {
    builder
      .addCase(indexNodes.fulfilled, (state, action) => mapNodesToState(state, action.payload))
      .addCase(showNode.fulfilled, (state, action) => {
        mapNodesToState(state, [{ ...action.payload, isMounted: true, isRoot: true }]);
        mapNodesToState(state, action.payload.descendants);
        delete state.byId[action.payload.id].descendants;
      })
      .addCase(createNode.fulfilled, (state, action) => {
        nodeSlice.caseReducers.addNewNode(state, {
          payload: {
            ...action.payload,
            isReplacingTempNode: true,
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
  setCurrentNode,
  updateNodeState,
  deleteNodeFromState,
  addNewNode,
  setPositionsById,
  deprecateReplaceTempNodeStatus,
} = actions;

export default reducer;
