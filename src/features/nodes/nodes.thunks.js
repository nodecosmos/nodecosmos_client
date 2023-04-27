import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirect } from 'react-router-dom';
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
  async ({
    rootId,
    id,
  }, _thunkAPI) => {
    try {
      let response;

      if (!rootId) {
        response = await nodecosmos.get(`/nodes/${id}`);
      } else {
        response = await nodecosmos.get(`/nodes/${rootId}/${id}`);
      }

      return response.data;
    } catch (error) {
      redirect('/404');
      return null;
    }
  },
);

// For now thunks are handled automatically by extraReducers in nodesSlice and treesSlice.
// Rethink this approach as it may be too implicit.
export const createNode = createAsyncThunk(
  'nodes/createNode',
  async (payload, _thunkAPI) => {
    const reqPayload = {
      rootId: payload.persistentRootId,
      parentId: payload.persistentParentId,
      title: payload.title,
    };

    const response = await nodecosmos.post('/nodes', reqPayload);

    return {
      ...response.data,
      persistentParentId: payload.persistentParentId,
      parentId: payload.parentId,
      tmpNodeId: payload.tmpNodeId,
    };
  },
);

export const updateNodeTitle = createAsyncThunk(
  'nodes/updateNodeTitle',
  async ({ persistentRootId, persistentId, title }, _thunk) => {
    try {
      const response = await nodecosmos.put('/nodes/title', {
        rootId: persistentRootId,
        id: persistentId,
        title,
      });

      return response.data;
    } catch (error) {
      return error.data;
    }
  },
);

export const updateNodeDescription = createAsyncThunk(
  'nodes/updateNodeDescription',
  async ({
    persistentRootId,
    persistentId,
    description,
    descriptionMarkdown,
  }, _thunk) => {
    try {
      const response = await nodecosmos.put('/nodes/description', {
        rootId: persistentRootId,
        id: persistentId,
        description,
        descriptionMarkdown,
      });

      return response.data;
    } catch (error) {
      return error.data;
    }
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
  async ({ persistentRootId, persistentId, nodeId }, _thunkAPI) => {
    const response = await nodecosmos.delete(`/nodes/${persistentRootId}/${persistentId}`);

    return {
      ...response.data,
      nodeId,
    };
  },
);

export const likeNode = createAsyncThunk(
  'nodes/likeNode',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/likes', {
      likeable_type: 'Node',
      id: payload,
    });

    return response.data;
  },
);

export const unlikeNode = createAsyncThunk(
  'nodes/unlikeNode',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.delete(`/likes/${payload}`, {
      data: {
        likeable_type: 'Node',
        id: payload,
      },
    });

    return response.data;
  },
);
