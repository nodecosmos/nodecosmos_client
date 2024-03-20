import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectContributionRequestsByNodeId = (state: RootState) => state.contributionRequests.byNodeId;
export const selectSearchTerm = (state: RootState) => state.contributionRequests.searchTerm;
export const selectCurrentContributionRequest = (
    state: RootState,
) => state.contributionRequests.currentContributionRequest;

export const selectContributionRequests = (
    nodeId: UUID,
) => createSelector(
    selectContributionRequestsByNodeId,
    (contributionRequestsByNodeId) => contributionRequestsByNodeId[nodeId],
);
export const selectContributionRequest = (
    nodeId: UUID,
    branchId: UUID,
) => createSelector(
    selectContributionRequestsByNodeId,
    (contributionRequestsByNodeId) => contributionRequestsByNodeId[nodeId]
    && contributionRequestsByNodeId[nodeId][branchId],
);
