import { LikeState } from './types';
import { createSelector } from '@reduxjs/toolkit';

interface State { likes: LikeState; }

export const selectLikesByBranchId = (state: State) => state.likes.byBranchId;

export const selectBranchLikes = (branchId: string) => createSelector(
    selectLikesByBranchId,
    (likesByBranchId) => (likesByBranchId[branchId] && likesByBranchId[branchId]) || {},
);
