import { createSlice } from '@reduxjs/toolkit';
import {
  indexContributionRequests,
  showContributionRequest, createContributionRequest, deleteContributionRequest,
} from './contributionRequests.thunks';

const contributionRequestsSlice = createSlice({
  name: 'contributionRequests',
  initialState: {
    byNodeId: {},
  },
  reducers: {
    updateContributionRequestState(state, action) {
      const { nodeId, contributionRequestId } = action.payload;
      const contributionRequest = state.byNodeId[nodeId][contributionRequestId];

      state[nodeId][contributionRequestId] = { ...action.payload, ...contributionRequest };
    },

  },
  extraReducers(builder) {
    builder
      .addCase(indexContributionRequests.fulfilled, (state, action) => {
        const { contributionRequests, nodeId } = action.payload;
        state.byNodeId[nodeId] = contributionRequests;
      })
      .addCase(showContributionRequest.fulfilled, (state, action) => {
        const { contributionRequest, nodeId } = action.payload;
        state.byNodeId[nodeId] ||= {};
        state.byNodeId[nodeId][contributionRequest.id] = contributionRequest;
      })
      .addCase(createContributionRequest.fulfilled, (state, action) => {
        const { contributionRequest, nodeId } = action.payload;
        state.byNodeId[nodeId] ||= {};
        state.byNodeId[nodeId][contributionRequest.id] = contributionRequest;
      })
      .addCase(deleteContributionRequest.fulfilled, (state, action) => {
        const { contributionRequest, nodeId } = action.payload;
        delete state.byNodeId[nodeId][contributionRequest.id];
      });
  },
});

const {
  actions,
  reducer,
} = contributionRequestsSlice;

export const {
  updateContributionRequestState,
} = actions;

export default reducer;
