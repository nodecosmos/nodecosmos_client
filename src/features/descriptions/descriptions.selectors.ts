import { RootState } from '../../store';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

export const selectDescriptionsByBranch = (state: RootState) => state.descriptions.byBranchId;

export const maybeSelectDescription = (branchId: UUID, objectId?: UUID) => createSelector(
    selectDescriptionsByBranch,
    (descriptionsByBranch) => (
        (objectId && descriptionsByBranch[branchId] && descriptionsByBranch[branchId][objectId])
    ),
);
