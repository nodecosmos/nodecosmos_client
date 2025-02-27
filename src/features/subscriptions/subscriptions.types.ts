import { UUID } from '../../types';

export enum SubscriptionStatus {
    Active = 'Active',
    Canceled = 'Canceled',
    Deleted = 'Deleted',
    Incomplete = 'Incomplete',
    IncompleteExpired = 'IncompleteExpired',
    PastDue = 'PastDue',
    Paused = 'Paused',
    Trialing = 'Trialing',
    Unpaid = 'Unpaid',
}

export interface Subscription {
    rootId: UUID;
    status: SubscriptionStatus;
    createdAt: string;
    updatedAt: string;
    memberIds: Set<UUID>;

}

export interface SubscriptionState {
    byRootId: Record<UUID, Subscription>;
}
