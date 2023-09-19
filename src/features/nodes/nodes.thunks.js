import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';
import { LIKE_TYPES } from '../app/constants';
import { uint8ArrayToBase64 } from '../../common/serializer';

export const indexNodes = createAsyncThunk(
  'nodes/indexNodes',
  async (params, _thunkAPI) => {
    const response = await nodecosmos.get('/nodes', params);
    return response.data;
  },
);

export const showNode = createAsyncThunk(
  'nodes/showNode',
  async ({
    rootId,
    id,
  }, _thunkAPI) => {
    let response;

    if (!rootId) {
      response = await nodecosmos.get(`/nodes/${id}`);
    } else {
      response = await nodecosmos.get(`/nodes/${rootId}/${id}`);
    }

    return response.data;
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

    return response.data;
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
      console.error(error);
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
    shortDescription,
    descriptionBlob,
  }, _thunk) => {
    try {
      const b64encoded = uint8ArrayToBase64(descriptionBlob);

      const response = await nodecosmos.put('/nodes/description', {
        rootId: persistentRootId,
        id: persistentId,
        description,
        descriptionMarkdown,
        shortDescription,
        descriptionBlob: b64encoded,
      });

      return response.data;
    } catch (error) {
      console.error(error);
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

export const getNodeDescription = createAsyncThunk(
  'nodes/getNodeDescription',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.get(`/nodes/${payload.rootId}/${payload.id}/description`);

    return response.data;
  },
);

export const getNodeDescriptionBlob = createAsyncThunk(
  'nodes/getNodeDescriptionBlob',

  async (payload, _thunkAPI) => {
    const response = await nodecosmos.get(`/nodes/${payload.rootId}/${payload.id}/description_blob`);

    return response.data;
  },
);

export const getLikesCount = createAsyncThunk(
  'nodes/getLikesCount',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.get(`/likes/${payload}`);

    return response.data;
  },
);

export const likeNode = createAsyncThunk(
  'nodes/likeNode',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.post('/likes', {
      object_type: LIKE_TYPES.node,
      object_id: payload,
    });

    return response.data;
  },
);

export const unlikeNode = createAsyncThunk(
  'nodes/unlikeNode',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.delete(`/likes/${payload}`);

    return response.data;
  },
);

export const reorder = createAsyncThunk(
  'nodes/reorder',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.put('/nodes/reorder', payload);

    return response.data;
  },
);

export const deleteNodeImage = createAsyncThunk(
  'nodes/deleteNodeImage',
  async (payload, _thunkAPI) => {
    const response = await nodecosmos.delete(`/nodes/${payload.rootId}/${payload.id}/delete_cover_image`);

    return response.data;
  },
);
