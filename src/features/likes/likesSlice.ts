import { likeObject, unlikeObject } from './likes.thunks';
import { LikePrimaryKey, LikeState } from './likes.types';
import { UUID } from '../../types';
import {
    logIn, logOut, syncUpCurrentUser,
} from '../users/users.thunks';
import { createSlice } from '@reduxjs/toolkit';

const CURRENT_USER_LIKES_KEY = 'CU_LIKES';

function setCurrentUserLikes(state: LikeState, userLikes: LikePrimaryKey[]) {
    userLikes?.forEach((userLike) => {
        state.currentUserLikes[userLike.branchId] ||= {};
        state.currentUserLikes[userLike.branchId][userLike.objectId] = true;
    });

    localStorage.setItem(CURRENT_USER_LIKES_KEY, JSON.stringify(state.currentUserLikes));
}

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
        builder
            .addCase(syncUpCurrentUser.fulfilled, (state, action) => {
                setCurrentUserLikes(state, action.payload.likes);
            })
            .addCase(logIn.fulfilled, (state, action) => {
                setCurrentUserLikes(state, action.payload.likes);
            })
            .addCase(likeObject.fulfilled, (state, action) => {
                const { objectId, branchId } = action.meta.arg;

                state.currentUserLikes[branchId] ||= {};
                state.currentUserLikes[branchId][objectId] = true;

                localStorage.setItem(CURRENT_USER_LIKES_KEY, JSON.stringify(state.currentUserLikes));
            }).addCase(unlikeObject.fulfilled, (state, action) => {
                const { objectId, branchId } = action.meta.arg;

                delete state.currentUserLikes[branchId][objectId];

                localStorage.setItem(CURRENT_USER_LIKES_KEY, JSON.stringify(state.currentUserLikes));
            }).addCase(logOut.fulfilled, (state) => {
                state.currentUserLikes = {};
                localStorage.removeItem(CURRENT_USER_LIKES_KEY);
            });
    },
});

const { reducer } = likesSlice;

export default reducer;
