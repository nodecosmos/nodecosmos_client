import {
    getUserLikes, likeObject, unlikeObject,
} from './likes.thunks';
import { LikeState } from './likes.types';
import { UUID } from '../../types';
import { logOut } from '../users/users.thunks';
import { createSlice } from '@reduxjs/toolkit';

const CURRENT_USER_LIKES_KEY = 'CU_LIKES';

function getUserLikesFromLocalStorage(): Record<UUID, Record<UUID, boolean>> {
    const likedObjectIds = localStorage.getItem(CURRENT_USER_LIKES_KEY);

    if (likedObjectIds) {
        try {
            return JSON.parse(likedObjectIds);
        } catch (e) {
            console.error(e);
        }
    }

    return {};
}

const initialState: LikeState = { currentUserLikes: getUserLikesFromLocalStorage() };
const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUserLikes.fulfilled, (state, action) => {
            const userLikes = action.payload;

            userLikes?.forEach((userLike) => {
                state.currentUserLikes[userLike.branchId] ||= {};
                state.currentUserLikes[userLike.branchId][userLike.objectId] = true;
            });

            localStorage.setItem(CURRENT_USER_LIKES_KEY, JSON.stringify(state.currentUserLikes));
        }).addCase(likeObject.fulfilled, (state, action) => {
            const { id, branchId } = action.payload;

            state.currentUserLikes[branchId] ||= {};
            state.currentUserLikes[branchId][id] = true;

            localStorage.setItem(CURRENT_USER_LIKES_KEY, JSON.stringify(state.currentUserLikes));
        }).addCase(unlikeObject.fulfilled, (state, action) => {
            const { id, branchId } = action.payload;

            delete state.currentUserLikes[branchId][id];

            localStorage.setItem(CURRENT_USER_LIKES_KEY, JSON.stringify(state.currentUserLikes));
        }).addCase(logOut.fulfilled, (state) => {
            state.currentUserLikes = {};
            localStorage.removeItem(CURRENT_USER_LIKES_KEY);
        });
    },
});

const { reducer } = likesSlice;

export default reducer;
