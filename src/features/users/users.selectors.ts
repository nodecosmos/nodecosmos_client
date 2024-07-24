import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectIsAuthenticated = (state: RootState) => state.users.isAuthenticated;
export const selectUsersByUsername = (state: RootState) => state.users.byUsername;
export const selectUsersById = (state: RootState) => state.users.byId;
export const selectCurrentUser = (state: RootState) => state.users.currentUser;

export const selectUser = (username: string) => createSelector(
    selectUsersByUsername,
    (users) => users[username],
);

export const selectUserById = (id: string) => createSelector(
    selectUsersById,
    (users) => users[id],
);

export const selectUsersByIds = (ids: string[]) => createSelector(
    selectUsersById,
    (users) => ids.map((id) => users[id]).filter(Boolean),
);
