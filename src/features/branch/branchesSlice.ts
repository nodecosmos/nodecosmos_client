import { BranchesState } from './branches.types';
import { showContributionRequest } from '../contribution-requests/contributionRequests.thunks';
import {
    create, deleteNode, updateDescription, updateTitle,
} from '../nodes/nodes.thunks';
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
            })
            .addCase(create.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.createdNodesById ||= {};
                    branch.createdNodesById[nodeId] = true;
                }
            })
            .addCase(deleteNode.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.deletedNodesById ||= {};
                    branch.deletedNodesById[nodeId] = true;
                }
            })
            .addCase(updateTitle.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.editedNodeTitlesById ||= {};
                    branch.editedNodeTitlesById[nodeId] = true;
                }
            })
            .addCase(updateDescription.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.editedNodeDescriptionsById ||= {};
                    branch.editedNodeDescriptionsById[nodeId] = true;
                }
            });
    },
});

const { reducer } = branchesSlice;

export default reducer;
