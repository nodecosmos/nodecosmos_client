import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectDescriptionsByBranch = (state: RootState) => state.descriptions.byBranchId;

export const selectDescription = (branchId: UUID, objectId: UUID) => createSelector(
    selectDescriptionsByBranch,
    (descriptionsByBranch) => (
        (descriptionsByBranch[branchId] && descriptionsByBranch[branchId][objectId]) || {}
    ),
);
