import NcAvatar from '../../../common/components/NcAvatar';
import { UUID } from '../../../types';
import { selectUserById } from '../users.selectors';
import {
    Box, Link, Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

interface UserProfileLinkProps {
    id: UUID;
    mt?: number;
}

function UserProfileLink({ id, mt = 0 }: UserProfileLinkProps) {
    const user = useSelector(selectUserById(id));

    const name = useMemo(() => {
        if (!user) return null;

        let name = user.firstName;

        if (user.lastName) {
            name += ` ${user.lastName}`;
        }

        return name;
    }, [user]);

    if (!name || !user) {
        return null;
    }

    return (
        <Box display="flex" alignItems="center" zIndex={1} position="relative" mt={mt}>
            <Link component={RouterLink} to={`/${user.username}`}>
                <NcAvatar size={50} name={name} src={user.profileImageUrl} />
            </Link>
            <Box>
                <Link component={RouterLink} to={`/${user.username}`}>
                    <Typography variant="body2" color="text.primary" ml={1} fontWeight="bold">
                        {name}
                    </Typography>
                </Link>
                <Link
                    component={RouterLink}
                    to={`/${user.username}`}
                    sx={{ '&:hover p': { color: 'text.link' } }}
                >
                    {user.username && (
                        <Typography variant="body2" color="text.tertiary" ml={1}>
                            @
                            {user.username}
                        </Typography>
                    )}
                </Link>
            </Box>
        </Box>
    );
}

export default React.memo(UserProfileLink);
