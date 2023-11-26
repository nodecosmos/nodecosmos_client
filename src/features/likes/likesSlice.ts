import { getLikedObjectIds } from './likes.thunks';
import { LikeState } from './types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: LikeState = {
    likedObjectIds: JSON.parse(localStorage.getItem('likedObjectIds') || '') || [],
};
const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        addLikedObjectId(state, action) {
            state.likedObjectIds.push(action.payload.id);
            localStorage.setItem('likedObjectIds', JSON.stringify(state.likedObjectIds));
        },
        removeLikedObjectId(state, action) {
            state.likedObjectIds = state.likedObjectIds.filter((id) => id !== action.payload.id);
            localStorage.setItem('likedObjectIds', JSON.stringify(state.likedObjectIds));
        },
    },
    extraReducers(builder) {
        builder.addCase(getLikedObjectIds.fulfilled, (state, action) => {
            if (action.payload.success) {
                localStorage.setItem('likedObjectIds', JSON.stringify(action.payload.likedObjectIds));
            } else {
                localStorage.removeItem('likedObjectIds');
            }

            return {
                ...state,
                likedObjectIds: action.payload.likedObjectIds,
            };
        });
    },
});

const { actions, reducer } = likesSlice;

export const {
    addLikedObjectId,
    removeLikedObjectId,
} = actions;

export default reducer;

