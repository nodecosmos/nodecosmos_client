import { UUID } from '../../types';

export interface PrimaryKey {
    objectId: UUID;
    branchId: UUID;
}

export interface Description extends PrimaryKey {
    nodeId: UUID;
    objectType: string;
    html: string;
    markdown: string;
    base64: string | null;
}

export interface DescriptionState {
    byBranchId: Record<UUID, Record<UUID, Description>>;
}
