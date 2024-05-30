import { UUID } from '../../types';

export interface InvitationPrimaryKey {
    branchId: UUID;
    nodeId: UUID;
    usernameOrEmail: string;
}

export enum InvitationStatus {
    Created = 'Created',
    Seen = 'Seen',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
}

export interface Invitation extends InvitationPrimaryKey {
    status: InvitationStatus;
    inviterId: UUID;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
}

export interface InvitationState {
    byBranchAndNodeId: Record<UUID, Record<UUID, Invitation[]>>;
    byToken: Record<string, Invitation>;
}
