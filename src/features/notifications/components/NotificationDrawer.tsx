import Notification from './Notification';
import CloseModalButton from '../../../common/components/modal/CloseModalButton';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectNotifications, selectUnseenNotificationCount } from '../notifications.selectors';
import { markAllAsRead } from '../notifications.thunks';
import { faBell } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Drawer, Typography,
} from '@mui/material';
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
        <Drawer open={open} onClose={onClose} anchor="right" elevation={8}>
            <Box
                boxSizing="border-box"
                mt={2}
                width={{
                    xs: '100%',
                    sm: 450,
                }}
                height={1}
            >
                <Typography variant="h5" color="text.secondary" mx={4} mb={4}>
                    <FontAwesomeIcon icon={faBell} />
                    <Box component="span" ml={2}>Notifications</Box>
                    <Box component="span" ml={2}>
                        <CloseModalButton onClose={onClose} />
                    </Box>
                </Typography>
                <Box m={2} mb={4}>
                    {notifications.map((notification) => (
                        <Notification key={notification.id} id={notification.id} onClose={onClose} />
                    ))}
                </Box>
                <br />
            </Box>
        </Drawer>
    );
}
