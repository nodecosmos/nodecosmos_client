import { createSelector } from '@reduxjs/toolkit';

export const selectContributionRequestsByNodeId = (state) => state.contributionRequests.byNodeId;
export const selectContributionRequest = (
  nodeId,
  contributionRequestId,
) => createSelector(
  selectContributionRequestsByNodeId,
  (contributionRequestsByNodeId) => contributionRequestsByNodeId[nodeId][contributionRequestId],
);
