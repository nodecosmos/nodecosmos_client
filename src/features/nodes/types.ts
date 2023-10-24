import { Owner, UUID } from '../../types';

export interface NodePrimaryKey {
    id: string;
}

export interface Node extends NodePrimaryKey {
    rootId: string;
    isPublic: boolean;
    isRoot: boolean;
    orderIndex: number;
    title: string;
    parentId: UUID;
    ancestorIds: UUID[];
    description: string;
    shortDescription: string;
    descriptionMarkdown: string;
    descriptionBase64: string;
    ownerId: UUID;
    ownerType: string;
    creatorId: UUID;
    editorIds: UUID[];
    owner: Owner;
    creator: { id: string; username: string; };
    likeCount: number;
    coverImageURL: string;
    coverImageKey: string;
    createdAt: Date;
    updatedAt: Date;
}
