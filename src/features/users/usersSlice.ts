import {
    showUserByUsername,
    logIn, logOut, syncUpCurrentUser, updateBio, confirmEmail, create, googleLogin, updateUsername,
} from './users.thunks';
import {
    CurrentUser, UpdateUserStatePayload, UserState,
} from './users.types';
import { HttpErrorCodes, ProfileType } from '../../types';
import { updatePropertiesOf } from '../../utils/object';
import { findByToken } from '../invitations/invitations.thunks';
import { getEditors, showNode } from '../nodes/nodes.thunks';
import { showSubscription } from '../subscriptions/subscriptions.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const CURRENT_USER_KEY = 'CU';

function getCurrentUser(): CurrentUser | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (user) {
        return JSON.parse(user, (key, value) => {
            if (key === 'lastSyncUpAt') {
                return new Date(value);
            }
            return value;
        });
    }
    return null;
}

const initialState: UserState = {
    byUsername: {},
    isAuthenticated: Boolean(localStorage.getItem(CURRENT_USER_KEY)),
    currentUser: getCurrentUser(),
    byId: {},
};

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserState(state: UserState, action: PayloadAction<UpdateUserStatePayload>) {
            const { username } = action.payload;
            state.byUsername[username] = {
                ...state.byUsername[username],
                ...action.payload,
            };

            if (state.currentUser && state.currentUser?.id === state.byUsername[username].id) {
                updatePropertiesOf<CurrentUser, UpdateUserStatePayload>(state.currentUser, state.byUsername[username]);

                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                const { user } = action.payload;
                user.lastSyncUpAt = new Date();

                state.isAuthenticated = true;
                state.currentUser = user;

                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
            })
            .addCase(create.fulfilled, (state, action) => {
                const user = action.payload;

                if (user) {
                    user.lastSyncUpAt = new Date();

                    state.isAuthenticated = true;
                    state.currentUser = user;

                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
                }
            })
            .addCase(updateUsername.fulfilled, (state, action) => {
                const { username } = action.payload;
                const user = state.currentUser;

                if (user) {
                    user.username = username;
                    state.currentUser = user;

                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
                } else {
                    throw new Error('User not found');
                }
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                const user = action.payload.user;

                user.lastSyncUpAt = new Date();

                state.isAuthenticated = true;
                state.currentUser = user;

                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
            })
            .addCase(syncUpCurrentUser.fulfilled, (state, action) => {
                const user = action.payload.user;

                if (user) {
                    state.currentUser = {
                        ...user,
                        lastSyncUpAt: new Date(),
                    };

                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
                } else {
                    state.currentUser = null;
                    localStorage.removeItem(CURRENT_USER_KEY);
                }
            })
            .addCase(syncUpCurrentUser.rejected, (state, action) => {
                if (action.payload?.status === HttpErrorCodes.Unauthorized) {
                    state.isAuthenticated = false;
                    state.currentUser = null;
                    localStorage.removeItem(CURRENT_USER_KEY);
                }
            })
            .addCase(confirmEmail.fulfilled, (state, action) => {
                if (state.currentUser) {
                    const confirmedUser = action.payload;

                    if (state.currentUser.id === confirmedUser.id) {
                        state.currentUser.isConfirmed = true;

                        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
                    }
                }
            })
            .addCase(showUserByUsername.fulfilled, (state, action) => {
                const { user } = action.payload;

                state.byUsername[user.username] = user;
                state.byId[user.id] = user;
            })
            .addCase(logOut.fulfilled, (state) => {
                localStorage.removeItem(CURRENT_USER_KEY);

                state.isAuthenticated = false;
                state.currentUser = null;
            })
            .addCase(updateBio.fulfilled, (state, action) => {
                const { username, bio } = action.payload;
                const user = state.byUsername[username];

                user.bio = bio;

                state.byId[user.id] = user;
            })
            .addCase(showNode.fulfilled, (state, action) => {
                const { owner } = action.payload.node;
                if (owner && owner.profileType === ProfileType.User) {
                    state.byId[owner.id] = {
                        id: owner.id,
                        firstName: owner.name,
                        username: owner.username as string,
                        profileImageUrl: owner.profileImageUrl,
                    };
                }
            })
            .addCase(getEditors.fulfilled, (state, action) => {
                action.payload.forEach((editor) => {
                    state.byId[editor.id] = editor;
                });
            })
            .addCase(showSubscription.fulfilled, (state, action) => {
                action.payload.users.forEach((editor) => {
                    state.byId[editor.id] = editor;
                });
            })
            .addCase(findByToken.fulfilled, (state, action) => {
                const { inviter } = action.payload;

                state.byId[inviter.id] = {
                    id: inviter.id,
                    firstName: inviter.firstName,
                    lastName: inviter.lastName,
                    username: inviter.username as string,
                    profileImageUrl: inviter.profileImageUrl,
                    createdAt: inviter.createdAt,
                };
            });
    },
});

export const { updateUserState } = usersSlice.actions;

export default usersSlice.reducer;
