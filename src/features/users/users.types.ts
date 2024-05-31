import { UUID } from '../../types';

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface User {
    id: UUID;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    bio: string;
    profileImageFilename: string;
    profileImageUrl: string;
    isConfirmed: boolean;
    isBlocked: boolean;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreateForm {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface Password {
    password: string;
}

export interface UpdateUserBase {
    id: UUID;
    username: string;
}

export interface CurrentUser extends Omit<User, 'password' | 'address' | 'bio' | 'createdAt' | 'updatedAt'> {
    lastSyncUpAt: Date;
}

export interface ShowUser {
    id: UUID;
    username: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl: string | null;
    createdAt?: Date;
}

export type UpdateUserStatePayload = Pick<User, 'username'> & Partial<User>;

export interface UserState {
    byUsername: { [username: string]: User };
    isAuthenticated: boolean;
    currentUser: CurrentUser | null;
    byId: Record<UUID, ShowUser>;
}
