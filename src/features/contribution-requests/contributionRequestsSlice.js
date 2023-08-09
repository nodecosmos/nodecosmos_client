import { createSlice } from '@reduxjs/toolkit';
import {
  indexContributionRequests,
  showContributionRequest, createContributionRequest, deleteContributionRequest,
} from './contributionRequests.thunks';

const contributionRequestsSlice = createSlice({
  name: 'contributionRequests',
  initialState: {
    byNodeId: {},
    searchTerm: null,
  },
  reducers: {
    updateContributionRequestState(state, action) {
      const { nodeId, contributionRequestId } = action.payload;
      const contributionRequest = state.byNodeId[nodeId][contributionRequestId];

      state[nodeId][contributionRequestId] = { ...action.payload, ...contributionRequest };
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(indexContributionRequests.fulfilled, (state, action) => {
        const contributionRequests = action.payload;

        if (contributionRequests.length === 0) {
          return;
        }

        const { nodeId } = contributionRequests[0];

        state.byNodeId[nodeId] ||= {};

        contributionRequests.forEach((contributionRequest) => {
          contributionRequest.createdAt = new Date(contributionRequest.createdAt);
          state.byNodeId[nodeId][contributionRequest.id] = contributionRequest;
        });
      })
      .addCase(showContributionRequest.fulfilled, (state, action) => {
        const contributionRequest = action.payload;
        const { nodeId } = contributionRequest;

        contributionRequest.createdAt = new Date(contributionRequest.createdAt);

        state.byNodeId[nodeId] ||= {};
        state.byNodeId[nodeId][contributionRequest.id] = contributionRequest;
      })
      .addCase(createContributionRequest.fulfilled, (state, action) => {
        const contributionRequest = action.payload;
        const { nodeId } = contributionRequest;

        contributionRequest.createdAt = new Date(contributionRequest.createdAt);

        state.byNodeId[nodeId] ||= [];
        state.byNodeId[nodeId][contributionRequest.id] = contributionRequest;
      })
      .addCase(deleteContributionRequest.fulfilled, (state, action) => {
        const contributionRequest = action.payload;
        const { nodeId } = contributionRequest;

        delete state.byNodeId[nodeId][contributionRequest.id];
      });
  },
});

const {
  actions,
  reducer,
} = contributionRequestsSlice;

export const {
  setSearchTerm,
  updateContributionRequestState,
} = actions;

export default reducer;
