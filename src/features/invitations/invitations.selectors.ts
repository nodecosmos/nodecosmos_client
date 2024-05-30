import { InvitationStatus } from './invitations.types';
import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectInvitationsByBranchAndNodeId = (state: RootState) => state.invitations.byBranchAndNodeId;
export const selectInvitationsByToken = (state: RootState) => state.invitations.byToken;

export const selectPendingInvitations = (branchId: string, nodeId: string) => createSelector(
    selectInvitationsByBranchAndNodeId,
    (invitationsByBranchId) => {
        const invitations = invitationsByBranchId[branchId]?.[nodeId] || [];

        return invitations.filter((invitation) => {
            return invitation.status === InvitationStatus.Created || invitation.status === InvitationStatus.Seen;
        });
    },
);

export const selectInvitationByToken = (token: string | null) => createSelector(
    selectInvitationsByToken,
    (invitationsByToken) => token && invitationsByToken && invitationsByToken[token],
);
