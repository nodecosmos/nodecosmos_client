import {
    createInvitation, deleteInvitation, findByToken, IndexInvitations,
} from './invitations.thunks';
import { InvitationState } from './invitations.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: InvitationState = {
    byBranchAndNodeId: {},
    byToken: {},
};

const invitationsSlice = createSlice({
    name: 'invitations',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(IndexInvitations.fulfilled, (state, action) => {
                const { branchId, nodeId } = action.meta.arg;
                const invitations = action.payload;
                state.byBranchAndNodeId[branchId] = state.byBranchAndNodeId[branchId] || {};
                state.byBranchAndNodeId[branchId][nodeId] = invitations;
            }).addCase(findByToken.fulfilled, (state, action) => {
                const token = action.meta.arg;
                const { invitation } = action.payload;
                state.byToken[token] = invitation;
            }).addCase(createInvitation.fulfilled, (state, action) => {
                const { branchId, nodeId } = action.meta.arg;

                state.byBranchAndNodeId[branchId] = state.byBranchAndNodeId[branchId] || {};
                state.byBranchAndNodeId[branchId][nodeId] = state.byBranchAndNodeId[branchId][nodeId] || [];
                state.byBranchAndNodeId[branchId][nodeId].push(action.payload);
            })
            .addCase(deleteInvitation.fulfilled, (state, action) => {
                const {
                    branchId, nodeId, usernameOrEmail, 
                } = action.meta.arg;
                const invitations = state.byBranchAndNodeId[branchId][nodeId];
                const index = invitations.findIndex((i) => i.usernameOrEmail === usernameOrEmail);

                if (index !== -1) {
                    invitations.splice(index, 1);
                }
            });
    },
});

const { reducer } = invitationsSlice;

export default reducer;
