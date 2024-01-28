import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectUsersById = (state: RootState) => state.users.byId;

export const selectUser = (id: string) => createSelector(
    selectUsersById,
    (usersById) => usersById[id],
);
