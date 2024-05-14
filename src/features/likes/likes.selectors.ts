import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectCurrentUserLikesState = (state: RootState) => state.likes.currentUserLikes;

export const selectCurrentUserLikes = (branchId: UUID) => createSelector(
    selectCurrentUserLikesState,
    (likesByBranchId) => (likesByBranchId[branchId] && likesByBranchId[branchId]) || {},
);
