import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectBranches = (state: RootState) => state.branches.byId;

export const selectBranch = (id: UUID) => createSelector(
    selectBranches,
    (branches) => branches[id],
);

export const selectConflict = (branchId: UUID) => createSelector(
    selectBranch(branchId),
    (branch) => branch?.conflict,
);
