import { Profile, UUID } from '../../types';

export enum ContributionRequestStatus {
    WorkInProgress = 'WorkInProgress',
    Published = 'Published',
    Merged = 'Merged',
    Closed = 'Closed',
}

// CR branch id is equal to CR's id
export interface CRPrimaryKey {
    nodeId: UUID;
    id: UUID;
}

export interface ContributionRequest extends CRPrimaryKey {
    rootId: UUID;
    title: string;
    status: ContributionRequestStatus;
    description?: string;
    createdAt: string;
    updatedAt: string;
    owner: Profile;
}

export type DescriptionAttrs = Pick<ContributionRequest, 'description'>;
export type BaseCR = Omit<ContributionRequest, keyof DescriptionAttrs>;
export type CreateCRPayload = Omit<ContributionRequest, 'nodeId' | 'id' | 'createdAt' | 'updatedAt' | 'owner'>;
export type UpdateTitleCRPayload = CRPrimaryKey & Pick<ContributionRequest, 'title'>;
export type UpdateDescriptionCRPayload = CRPrimaryKey
    & Pick<ContributionRequest, 'description'>;

export interface ContributionRequestsState {
    byNodeId: Record<UUID, Record<UUID, ContributionRequest>>;
    searchTerm: string | null;
    currentContributionRequest: ContributionRequest | null;
}
