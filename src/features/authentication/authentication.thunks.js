import { createAsyncThunk } from '@reduxjs/toolkit';
import nodecosmos from '../../apis/nodecosmos-server';

// eslint-disable-next-line import/prefer-default-export
export const syncUpCurrentUser = createAsyncThunk(
  'auth/syncUpCurrentUser',
  async (_, _thunkAPI) => {
    try {
      const response = await nodecosmos.get('/sync_current_user');
      return response.data;
    } catch (err) {
      return err.response.data.error;
    }
  },
);
