import NcAvatar from '../../../common/components/NcAvatar';
import { ShowUser } from '../../users/users.types';
import {
    Box, Link, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    user: ShowUser;
    onClick: (username: string) => void;
    mt?: number;
    noHover?: boolean;
}

export default function InviteUserItem({
    user, onClick, mt = 2, noHover = false,
}: Props) {
    const handleUserClick = useCallback(() => {
        onClick(user.username);
    }, [onClick, user.username]);

    return (
        <Box
            display="flex"
            alignItems="center"
            zIndex={1}
            position="relative"
            mt={mt}
            p={1}
            onClick={handleUserClick}
            sx={{
                cursor: 'pointer',
                borderColor: 'transparent',
                borderRadius: 2,
                '&:hover': {
                    backgroundColor: noHover ? null : 'background.hover',
                    borderColor: 'borders.4',
                },
            }}
        >
            <Link component={RouterLink} to={`/${user.username}`} target="_blank">
                <NcAvatar size={50} name={user.username} src={user.profileImageUrl} />
            </Link>
            <Box>
                <Typography variant="body2" color="text.primary" ml={1} fontWeight="bold">
                    {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.primary" ml={1}>
                    @
                    {user.username}
                </Typography>
            </Box>
        </Box>
    );
}
