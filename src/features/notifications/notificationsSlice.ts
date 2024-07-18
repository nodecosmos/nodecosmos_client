import { getNotifications, markAllAsRead } from './notifications.thunks';
import { Notification, NotificationState } from './notifications.types';
import { UUID } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: NotificationState = { byId: {} };

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getNotifications.fulfilled, (state, action) => {
            const { notifications } = action.payload;
            state.byId = notifications.reduce((acc: Record<UUID, Notification>, notification: Notification) => {
                acc[notification.id] = notification;

                return acc;
            }, {});
        }).addCase(markAllAsRead.fulfilled, (state) => {
            Object.values(state.byId).forEach((notification) => {
                notification.seen = true;
            });
        });
    },
});

const { reducer } = notificationsSlice;

export default reducer;
