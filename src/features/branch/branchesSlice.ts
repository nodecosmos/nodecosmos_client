import { BranchesState } from './branches.types';
import { showContributionRequest } from '../contribution-requests/contributionRequests.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BranchesState = { byId: {} };

const branchesSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(showContributionRequest.fulfilled, (state, action) => {
                const { branch } = action.payload;
                state.byId[branch.id] = branch;
            });
    },
});

const { reducer } = branchesSlice;

export default reducer;
