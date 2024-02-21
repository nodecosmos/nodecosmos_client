import { Profile, UUID } from '../../types';

export enum ContributionRequestStatus {
    WorkInProgress = 'WORK_IN_PROGRESS',
    Published = 'PUBLISHED',
    Merged = 'MERGED',
    Closed = 'CLOSED',
}

// CR branch id is equal to CR's id
export interface CRPrimaryKey {
    nodeId: UUID;
    id: UUID;
}

export interface ContributionRequest extends CRPrimaryKey {
    title: string;
    status: ContributionRequestStatus;
    description?: string;
    descriptionMarkdown?: string;
    createdAt: Date;
    updatedAt: Date;
    owner: Profile;
}

export type DescriptionAttrs = Pick<ContributionRequest, 'description' | 'descriptionMarkdown'>;
export type BaseCR = Omit<ContributionRequest, keyof DescriptionAttrs>;
export type CreateCRPayload = Omit<ContributionRequest, 'nodeId' | 'id' | 'createdAt' | 'updatedAt' | 'owner'>;
export type UpdateTitleCRPayload = CRPrimaryKey & Pick<ContributionRequest, 'title'>;
export type UpdateDescriptionCRPayload = CRPrimaryKey
    & Pick<ContributionRequest, 'description' | 'descriptionMarkdown'>;

export interface ContributionRequestsState {
    byNodeId: Record<UUID, Record<UUID, ContributionRequest>>;
    searchTerm: string | null;
    currentContributionRequest: ContributionRequest | null;
}
