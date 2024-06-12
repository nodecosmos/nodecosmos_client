import NcAvatar from '../../../common/components/NcAvatar';
import { NodecosmosDispatch } from '../../../store';
import { ObjectType, UUID } from '../../../types';
import { timeSince } from '../../../utils/localTime';
import { selectObject } from '../../app/app.thunks';
import { SELECTED_OBJ_Q } from '../../app/hooks/useSelectObject';
import { selectNodeFromParams } from '../../nodes/nodes.actions';
import { selectNotification } from '../notifications.selectors';
import { Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';
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

    return (
        <div className="Notification">
            <Box onClick={navigateToNotification}>
                <Box display="flex" alignItems="center">
                    <NcAvatar
                        width={45}
                        height={45}
                        name={author?.name}
                        src={author?.profileImageUrl} />
                    <Box>
                        <Typography variant="body1" color="text.secondary" ml={2}>
                            <Typography
                                variant="body1"
                                component="span"
                                fontWeight="bold"
                                mr={1}>{author?.name}
                            </Typography>
                            <Typography variant="body2" component="span" color="text.secondary">{notification.text}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.tertiary" ml={2} mt={1}>
                            {timeSince(createdAt.toString())}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
