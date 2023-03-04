import { createSlice } from '@reduxjs/toolkit';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: {
    byId: {},
  },
  reducers: {},
  extraReducers(builder) {
  },
});

const {
  actions,
  reducer,
} = nodesSlice;

export const {
} = actions;

export default reducer;
