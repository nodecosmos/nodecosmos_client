import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectLikesByBranchId = (state: RootState) => state.likes.byBranchId;

export const selectBranchLikes = (branchId: string) => createSelector(
    selectLikesByBranchId,
    (likesByBranchId) => (likesByBranchId[branchId] && likesByBranchId[branchId]) || {},
);
