import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectNotifications, selectUnseenNotificationCount } from '../notifications.selectors';
import { markAllAsRead } from '../notifications.thunks';
import { Box, Drawer } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface NotificationDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function NotificationDrawer({ open, onClose }: NotificationDrawerProps) {
    const notifications = useSelector(selectNotifications);
    const [seen, setSeen] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const unseenNotificationCount = useSelector(selectUnseenNotificationCount);

    useEffect(() => {
        if (!seen && open && (unseenNotificationCount > 0)) {
            dispatch(markAllAsRead());
            setSeen();
        }
    }, [dispatch, open, seen, setSeen, unseenNotificationCount]);

    return (
        <div>
            <Drawer open={open} onClose={onClose} anchor="right">
                <Box width={{
                    xs: '100%',
                    sm: 450,
                }}>
                    {notifications.map((notification) => (
                        <div key={notification.id}>{notification.text}</div>
                    ))}
                </Box>
            </Drawer>
        </div>
    );
}
