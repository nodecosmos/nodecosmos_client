import { ObjectType, UUID } from '../../types';

export interface PrimaryKey {
    branchId: UUID;
    objectId: UUID;
}

export interface QueryKey extends PrimaryKey {
    nodeId: UUID;
    rootId: UUID;
    objectType: ObjectType;
}

export interface Description extends PrimaryKey {
    rootId: UUID;
    nodeId: UUID;
    objectType: ObjectType;
    html: string;
    markdown: string;
    base64: string | null;
}

export interface DescriptionState {
    byBranchId: Record<UUID, Record<UUID, Description>>;
}
