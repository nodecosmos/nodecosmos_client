import NcAvatar from '../../../common/components/NcAvatar';
import { NodecosmosDispatch } from '../../../store';
import { ObjectType, UUID } from '../../../types';
import { timeSince } from '../../../utils/localTime';
import { selectObject } from '../../app/app.thunks';
import { SELECTED_OBJ_Q } from '../../app/hooks/useSelectObject';
import { selectNodeFromParams } from '../../nodes/nodes.actions';
import { selectNotification } from '../notifications.selectors';
import { NotificationType } from '../notifications.types';
import {
    faCalendarUsers, faComments, faCodePullRequest, faCodeMerge,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface NotificationProps {
    id: UUID;
    onClose: () => void;
}

export default function Notification({ id, onClose }: NotificationProps) {
    const notification = useSelector(selectNotification(id));
    const {
        author, createdAt, url,
    } = notification;
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const navigateToNotification = useCallback(() => {
        const parsed = new URL(url);
        const path = parsed.pathname;
        const encodedData = parsed.searchParams.get(SELECTED_OBJ_Q);

        if (encodedData) {
            const data = JSON.parse(atob(encodedData));
            dispatch(selectObject(data));

            if (data.objectType === ObjectType.Node) {
                dispatch(selectNodeFromParams({
                    branchId: data.branchId,
                    id: data.objectId,
                }));
            }
        }

        navigate({
            pathname: path,
            search: parsed.search,
        });

        onClose();
    }, [dispatch, navigate, onClose, url]);

    const icon = useMemo(() => {
        switch (notification.notificationType) {
        case NotificationType.NewContributionRequest:
            return <FontAwesomeIcon icon={faCodePullRequest} />;
        case NotificationType.MergeContributionRequest:
            return <FontAwesomeIcon icon={faCodeMerge} />;
        case NotificationType.NewComment:
            return <FontAwesomeIcon icon={faComments} />;
        case NotificationType.NewInvitation:
            return <FontAwesomeIcon icon={faCalendarUsers} />;
        default:
            return <FontAwesomeIcon icon={faComments} />;
        }
    }, [notification.notificationType]);

    const color = useMemo(() => {
        switch (notification.notificationType) {
        case NotificationType.NewContributionRequest:
            return 'toolbar.orange';
        case NotificationType.MergeContributionRequest:
            return 'merge.main';
        case NotificationType.NewComment:
            return 'primary.main';
        case NotificationType.NewInvitation:
            return 'toolbar.green';
        default:
            return 'texts.primary';
        }
    }, [notification.notificationType]);

    return (
        <Box className="Notification">
            <Box onClick={navigateToNotification}>
                <Box display="flex" alignItems="center">
                    <Box position="relative">
                        <Box
                            className="background-toolbar-hover"
                            position="absolute"
                            zIndex={1}
                            color={color}
                            borderRadius="500px"
                            height={35}
                            width={35}
                            fontSize={18}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            bottom={-16}
                            right={-8}
                        >
                            {icon}
                        </Box>
                        <NcAvatar
                            size={45}
                            name={author?.name}
                            src={author?.profileImageUrl} />
                    </Box>
                    <Box>
                        <Typography variant="body1" color="texts.secondary" ml={2}>
                            <Typography
                                variant="body1"
                                component="span"
                                fontWeight="bold"
                                mr={1}>{author?.name}
                            </Typography>
                            <Typography variant="body2" component="span" color="texts.secondary">{notification.text}
                            </Typography>
                        </Typography>
                        <Typography variant="subtitle2" color="toolbar.blue" ml={2} mt={1} fontWeight="bold">
                            {timeSince(createdAt.toString())}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
