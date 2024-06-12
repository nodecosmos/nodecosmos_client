import { UUID } from '../../types';

export interface NotificationPrimaryKey {
    userId: UUID;
    createdAt: Date;
    id: UUID;
}

export enum NotificationType {
    NewContributionRequest = 'NewContributionRequest',
    MergeContributionRequest = 'MergeContributionRequest',
    NewComment = 'NewComment',
}

export interface Notification extends NotificationPrimaryKey {
    notificationType: NotificationType;
    text: string;
    url: string;
    seen: boolean;
    updatedAt: Date;
}

export interface NotificationState {
    byId: Record<UUID, Notification>;
}
