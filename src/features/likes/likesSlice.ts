import {
    getUserLikes, likeObject, unlikeObject,
} from './likes.thunks';
import { LikeState } from './types';
import { UUID } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

function getUserLikesFromLocalStorage(): Record<UUID, Record<UUID, boolean>> {
    const likedObjectIds = localStorage.getItem('likesByBranchId');

    if (likedObjectIds) {
        try {
            return JSON.parse(likedObjectIds);
        } catch (e) {
            console.error(e);
        }
    }

    return {};
}

const initialState: LikeState = { byBranchId: getUserLikesFromLocalStorage() };
const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        removeLikedObjectId(state, action) {
            const { id, branchId } = action.payload;

            delete state.byBranchId[branchId][id];

            localStorage.setItem('likesByBranchId', JSON.stringify(state.byBranchId));
        },
    },
    extraReducers(builder) {
        builder.addCase(getUserLikes.fulfilled, (state, action) => {
            const userLikes = action.payload;

            userLikes?.forEach((userLike) => {
                state.byBranchId[userLike.branchId] ||= {};
                state.byBranchId[userLike.branchId][userLike.objectId] = true;
            });

            localStorage.setItem('likesByBranchId', JSON.stringify(state.byBranchId));
        });

        builder.addCase(likeObject.fulfilled, (state, action) => {
            const { id, branchId } = action.payload;

            state.byBranchId[branchId] ||= {};
            state.byBranchId[branchId][id] = true;

            localStorage.setItem('likesByBranchId', JSON.stringify(state.byBranchId));
        });

        builder.addCase(unlikeObject.fulfilled, (state, action) => {
            const { id, branchId } = action.payload;

            delete state.byBranchId[branchId][id];

            localStorage.setItem('likesByBranchId', JSON.stringify(state.byBranchId));
        });
    },
});

const { reducer } = likesSlice;

export default reducer;
