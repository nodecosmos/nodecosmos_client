import NcAvatar from '../../../common/components/NcAvatar';
import { UUID } from '../../../types';
import { timeSince } from '../../../utils/localTime';
import { selectNotification } from '../notifications.selectors';
import {
    Box, Link, Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

interface NotificationProps {
    id: UUID;
    onClose: () => void;
}

export default function Notification({ id, onClose }: NotificationProps) {
    const notification = useSelector(selectNotification(id));
    const {
        author, createdAt, url,
    } = notification;
    const path = useMemo(() => url.split(window.location.origin)[1], [url]);

    return (
        <Box
            borderRadius={2}
            border={1}
            borderColor="borders.4"
            mt={2}
            p={2}>
            <Link component={RouterLink} to={path} onClick={onClose}>
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
                            <Typography variant="body2" component="span">{notification.text}
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.tertiary" ml={2} mt={1}>
                            {timeSince(createdAt.toString())}
                        </Typography>
                    </Box>
                </Box>
            </Link>
        </Box>
    );
}
