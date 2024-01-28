import { showUserByUsername } from './user.thunks';
import { UserState } from './user.types';
import { syncUpCurrentUser } from '../authentication/authentication.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = { byId: {} };

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(syncUpCurrentUser.fulfilled, (state, action) => {
            const { user } = action.payload;

            state.byId[user.id] = user;
        }).addCase(showUserByUsername.fulfilled, (state, action) => {
            const user = action.payload;

            state.byId[user.id] = user;
        });
    },
});

export default usersSlice.reducer;
