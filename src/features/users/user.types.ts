import { UUID } from '../../types';

export interface User {
    id: UUID;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    bio: string;
    profileImageFilename: string;
    profileImageUrl: string;
    isConfirmed: boolean;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserState {
    byId: Record<UUID, User>;
}
