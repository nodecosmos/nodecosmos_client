import { ContributionRequestsState } from './contributionRequest.types';
import {
    indexContributionRequests,
    showContributionRequest,
    createContributionRequest,
    deleteContributionRequest,
    updateContributionRequestDescription,
    updateContributionRequestTitle,
} from './contributionRequests.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ContributionRequestsState = {
    byNodeId: {},
    searchTerm: null,
    currentContributionRequest: null,
};

const contributionRequestsSlice = createSlice({
    name: 'contributionRequests',
    initialState,
    reducers: {
        updateContributionRequestState(state, action) {
            const { nodeId, id } = action.payload;
            const contributionRequest = state.byNodeId[nodeId][id];

            state.byNodeId[nodeId][id] = {
                ...contributionRequest,
                ...action.payload,
            };
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setCurrentContributionRequest(state, action) {
            state.currentContributionRequest = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(indexContributionRequests.fulfilled, (state, action) => {
                const contributionRequests = action.payload;

                if (!contributionRequests || contributionRequests.length === 0) {
                    return;
                }

                const { nodeId } = contributionRequests[0];

                state.byNodeId[nodeId] ||= {};

                contributionRequests.forEach((contributionRequest) => {
                    state.byNodeId[nodeId][contributionRequest.id] = contributionRequest;
                });
            })
            .addCase(showContributionRequest.fulfilled, (state, action) => {
                const { contributionRequest } = action.payload;
                const { nodeId } = contributionRequest;

                state.byNodeId[nodeId] ||= {};
                state.byNodeId[nodeId][contributionRequest.id] = contributionRequest;
            })
            .addCase(updateContributionRequestTitle.fulfilled, (state, action) => {
                const {
                    nodeId, id, title,
                } = action.payload;

                state.byNodeId[nodeId][id].title = title;
            })
            .addCase(updateContributionRequestDescription.fulfilled, (state, action) => {
                const {
                    nodeId, id, description,
                } = action.payload;

                state.byNodeId[nodeId][id].description = description;
            })
            .addCase(createContributionRequest.fulfilled, (state, action) => {
                const contributionRequest = action.payload;
                const { nodeId } = contributionRequest;

                state.byNodeId[nodeId] ||= {};
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
    setCurrentContributionRequest,
} = actions;

export default reducer;
