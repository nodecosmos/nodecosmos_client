import Notification from './Notification';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { DRAWER_WIDTH } from '../../app/constants';
import { selectNotifications, selectUnseenNotificationCount } from '../notifications.selectors';
import { markAllAsRead } from '../notifications.thunks';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Drawer, Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
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
                mt={1}
                width={DRAWER_WIDTH}
                height={1}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    mx={2}
                    mb={4}>
                    <Typography variant="body1" color="texts.tertiary" fontWeight="bold">
                        Notifications
                    </Typography>
                    <IconButton
                        className="toolbar-default fs-18"
                        disableRipple
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                </Box>
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
