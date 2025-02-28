import NotificationDrawer from './NotificationDrawer';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectCurrentUser } from '../../users/users.selectors';
import { selectUnseenNotificationCount } from '../notifications.selectors';
import { getNotifications } from '../notifications.thunks';
import { faBell } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, IconButton } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FETCH_NOTIFICATIONS_INTERVAL = 60_000; // 1 min

export default function NotificationsButton() {
    const unseenNotificationCount = useSelector(selectUnseenNotificationCount);
    const [modalOpen, openModal, closeModal] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();
    const interval = useRef<number | undefined>();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if (!interval.current && currentUser) {
            dispatch(getNotifications());
            interval.current = setInterval(
                () => dispatch(getNotifications({ new: true })), FETCH_NOTIFICATIONS_INTERVAL,
            );
        }

        return () => clearInterval(interval.current);
    }, [dispatch, currentUser]);

    return (
        <div>
            <Badge badgeContent={unseenNotificationCount} color="primary">
                <IconButton
                    onClick={openModal}
                    className="fs-18 toolbar-default min-vis-width-viewport-400"
                >
                    <FontAwesomeIcon icon={faBell} />
                </IconButton>
            </Badge>

            <NotificationDrawer open={modalOpen} onClose={closeModal} />
        </div>
    );
}
