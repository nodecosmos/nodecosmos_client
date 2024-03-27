import {
    getDescription, getDescriptionBase64, getOriginalDescription, saveDescription,
} from './descriptions.thunks';
import { DescriptionState } from './descriptions.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: DescriptionState = { byBranchId: {} };

const descriptionsSlice = createSlice({
    name: 'descriptions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDescription.fulfilled, (state, action) => {
                const { branchId, objectId } = action.payload;

                state.byBranchId[branchId] ||= {};

                state.byBranchId[branchId][objectId] = action.payload;
            })
            .addCase(getDescriptionBase64.fulfilled, (state, action) => {
                const { branchId, objectId } = action.payload;

                state.byBranchId[branchId] ||= {};

                state.byBranchId[branchId][objectId] = action.payload;
            })
            .addCase(getOriginalDescription.fulfilled, (state, action) => {
                const { currentRootNodeId } = action.meta.arg;
                const { objectId } = action.payload;

                state.byBranchId[currentRootNodeId] ||= {};
                state.byBranchId[currentRootNodeId][objectId] = {
                    ...action.payload,
                    base64: null,
                };
            })
            .addCase(saveDescription.fulfilled, (state, action) => {
                const { branchId, objectId } = action.payload;

                state.byBranchId[branchId] ||= {};

                state.byBranchId[branchId][objectId] = action.payload;
            });
    },
});

const { reducer } = descriptionsSlice;

export default reducer;
