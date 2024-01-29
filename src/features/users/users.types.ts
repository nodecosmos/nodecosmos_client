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

export interface CurrentUser extends Omit<User, 'password' | 'address' | 'bio' | 'createdAt' | 'updatedAt'> {
    lastSyncUpAt: Date;
}

export interface UserState {
    byId: Record<UUID, User>;
    isAuthenticated: boolean;
    currentUser: CurrentUser | null;
}
