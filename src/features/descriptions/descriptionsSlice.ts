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
                const { originalId } = action.meta.arg;
                const { objectId } = action.payload;

                state.byBranchId[originalId] ||= {};
                state.byBranchId[originalId][objectId] = {
                    ...action.payload,
                    base64: null,
                };
            })
            .addCase(saveDescription.fulfilled, (state, action) => {
                const {
                    objectId, branchId, rootId, nodeId, objectType, html, markdown, base64,
                } = action.payload;

                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][objectId] ||= {
                    objectId,
                    branchId,
                    rootId,
                    nodeId,
                    objectType,
                    html,
                    markdown,
                    base64,
                };

                state.byBranchId[branchId][objectId].html = html;
                state.byBranchId[branchId][objectId].markdown = markdown;
                // NOTE: we need to pay attention to not break editor flow
                state.byBranchId[branchId][objectId].base64 = base64;
            });
    },
});

const { reducer } = descriptionsSlice;

export default reducer;
