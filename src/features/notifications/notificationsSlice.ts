import { getNotifications, markAllAsRead } from './notifications.thunks';
import { NotificationState } from './notifications.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: NotificationState = { byId: {} };

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getNotifications.fulfilled, (state, action) => {
                const isNew = action.meta.arg?.new;
                const { notifications } = action.payload;

                const newNotifications = Object.fromEntries(
                    notifications.map(notification => [notification.id, notification]),
                );

                if (isNew) {
                    const currentNotifications = Object.values(state.byId);
                    currentNotifications.forEach(notification => {
                        if (!Object.prototype.hasOwnProperty.call(newNotifications, notification.id)) {
                            newNotifications[notification.id] = notification;
                        }
                    });
                }

                state.byId = newNotifications;
            })
            .addCase(markAllAsRead.fulfilled, (state) => {
                Object.values(state.byId).forEach((notification) => {
                    notification.seen = true;
                });
            });
    },
});

const { reducer } = notificationsSlice;

export default reducer;
