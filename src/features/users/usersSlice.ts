import {
    showUserByUsername,
    logIn, logOut, syncUpCurrentUser,
} from './users.thunks';
import { CurrentUser, UserState } from './users.types';
import { createSlice } from '@reduxjs/toolkit';

function getCurrentUser(): CurrentUser | null {
    const user = localStorage.getItem('currentUser');
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
    byId: {},
    isAuthenticated: Boolean(localStorage.getItem('currentUser')),
    currentUser: getCurrentUser(),
};

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state, action) => {
                const user = action.payload;
                user.lastSyncUpAt = new Date();

                localStorage.setItem('currentUser', JSON.stringify(user));

                state.isAuthenticated = true;
                state.currentUser = user;
            })
            .addCase(syncUpCurrentUser.fulfilled, (state, action) => {
                const user = action.payload;

                localStorage.setItem('currentUser', JSON.stringify(user));

                state.currentUser = user;
            })
            .addCase(showUserByUsername.fulfilled, (state, action) => {
                const user = action.payload;

                state.byId[user.id] = user;
            })
            .addCase(logOut.fulfilled, (state) => {
                localStorage.removeItem('currentUser');

                state.isAuthenticated = false;
                state.currentUser = null;
            });
    },
});

export default usersSlice.reducer;
