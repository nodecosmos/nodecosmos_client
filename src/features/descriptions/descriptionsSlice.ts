import { DescriptionState } from './descriptions.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: DescriptionState = { byBranchId: {} };

const descriptionsSlice = createSlice({
    name: 'descriptions',
    initialState,
    reducers: {},
});

const { reducer } = descriptionsSlice;

export default reducer;
