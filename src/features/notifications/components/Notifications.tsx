import NotificationDrawer from './NotificationDrawer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import { NodecosmosDispatch } from '../../../store';
import { selectUnseenNotificationCount } from '../notifications.selectors';
import { getNotifications } from '../notifications.thunks';
import { faBell } from '@fortawesome/pro-solid-svg-icons';
import { Badge } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Notifications() {
    const unseenNotificationCount = useSelector(selectUnseenNotificationCount);
    const [fetched, setFetched] = useBooleanStateValue(false);
    const [modalOpen, openModal, closeModal] = useBooleanStateValue(false);
    const dispatch: NodecosmosDispatch = useDispatch();

    useEffect(() => {
        if (!fetched) {
            dispatch(getNotifications());
            setFetched();
        }
    }, [dispatch, fetched, setFetched]);

    return (
        <div>
            <Badge badgeContent={unseenNotificationCount} color="primary">
                <ToolbarItem title="notifications" icon={faBell} color="toolbar.yellow" onClick={openModal} />
            </Badge>
            <NotificationDrawer open={modalOpen} onClose={closeModal} />
        </div>

    );
}
