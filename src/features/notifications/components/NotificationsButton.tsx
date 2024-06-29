import NotificationDrawer from './NotificationDrawer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectUnseenNotificationCount } from '../notifications.selectors';
import { getNotifications } from '../notifications.thunks';
import { faBell } from '@fortawesome/pro-solid-svg-icons';
import { Badge } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FETCH_NOTIFICATIONS_INTERVAL = 120000; // 2 minutes

export default function NotificationsButton() {
    const unseenNotificationCount = useSelector(selectUnseenNotificationCount);
    const [modalOpen, openModal, closeModal] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const interval = useRef<number | undefined>();
    useEffect(() => {
        if (!interval.current) {
            dispatch(getNotifications());
            interval.current = setInterval(
                () => dispatch(getNotifications({ new: true })), FETCH_NOTIFICATIONS_INTERVAL,
            );
        }

        return () => clearInterval(interval.current);
    }, [dispatch]);

    return (
        <div>
            <Badge badgeContent={unseenNotificationCount} color="primary">
                <ToolbarItem title="notifications" icon={faBell} color="toolbar.yellow" onClick={openModal} />
            </Badge>
            <NotificationDrawer open={modalOpen} onClose={closeModal} />
        </div>
    );
}
