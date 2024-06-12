import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

const selectNotificationsById = (state: RootState) => state.notifications.byId;

export const selectNotifications = createSelector(
    selectNotificationsById,
    (notificationsById) =>
        Object.values(notificationsById).sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf()),
);

export const selectUnseenNotificationCount = createSelector(
    selectNotificationsById,
    (notifications) => Object.values(notifications).filter((notification) => !notification.seen).length,
);

export const selectNotification = (id: string) => createSelector(
    selectNotificationsById,
    (notificationsById) => notificationsById[id],
);
