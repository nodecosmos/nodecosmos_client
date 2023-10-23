import { createSelector } from '@reduxjs/toolkit';

export const selectContributionRequestsByNodeId = (state) => state.contributionRequests.byNodeId;
export const selectSearchTerm = (state) => state.contributionRequests.searchTerm;
export const selectCurrentContributionRequest = (state) => state.contributionRequests.currentContributionRequest;
export const selectContributionRequests = (
    nodeId,
) => createSelector(
    selectContributionRequestsByNodeId,
    (contributionRequestsByNodeId) => contributionRequestsByNodeId[nodeId],
);
export const selectContributionRequest = (
    nodeId,
    contributionRequestId,
) => createSelector(
    selectContributionRequestsByNodeId,
    (contributionRequestsByNodeId) => contributionRequestsByNodeId[nodeId]
    && contributionRequestsByNodeId[nodeId][contributionRequestId],
);
