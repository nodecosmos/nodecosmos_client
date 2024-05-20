import {
    showUserByUsername,
    logIn, logOut, syncUpCurrentUser, updateBio, confirmEmail,
} from './users.thunks';
import {
    CurrentUser, UpdateUserStatePayload, UserState,
} from './users.types';
import { HttpErrorCodes } from '../../types';
import { updatePropertiesOf } from '../../utils/object';
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
                const user = action.payload;
                user.lastSyncUpAt = new Date();

                state.isAuthenticated = true;
                state.currentUser = user;

                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(state.currentUser));
            })
            .addCase(syncUpCurrentUser.fulfilled, (state, action) => {
                const user = action.payload;

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
                    }
                }
            })
            .addCase(showUserByUsername.fulfilled, (state, action) => {
                const user = action.payload;

                state.byUsername[user.username] = user;
            })
            .addCase(logOut.fulfilled, (state) => {
                localStorage.removeItem(CURRENT_USER_KEY);

                state.isAuthenticated = false;
                state.currentUser = null;
            })
            .addCase(updateBio.fulfilled, (state, action) => {
                const { username, bio } = action.payload;

                state.byUsername[username].bio = bio;
            });
    },
});

export const { updateUserState } = usersSlice.actions;

export default usersSlice.reducer;
