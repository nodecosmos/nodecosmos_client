import Bio from './Bio';
import ImageUpload from './ImageUpload';
import NcAvatar from '../../../../common/components/NcAvatar';
import useBooleanStateValue from '../../../../common/hooks/useBooleanStateValue';
import toLocalTime from '../../../../utils/localTime';
import useProfileUser from '../../hooks/useProfileUser';
import {
    Box, Container, Typography,
} from '@mui/material';
import React from 'react';

export default function Profile() {
    const user = useProfileUser();

    const [hovered, hover, unhover] = useBooleanStateValue();

    if (!user) {
        return null;
    }

    return (
        <Container maxWidth="md">
            <Box
                p={4}
                border={1}
                borderColor="borders.1"
                borderRadius={2}
                onMouseLeave={unhover}
                width={1}
                display="flex"
                justifyContent="start"
                flexDirection="column"
                alignItems="center">
                <Box
                    width="fit-content"
                    position="relative"
                    onMouseOver={hover}
                    onMouseLeave={unhover}
                >
                    {hovered && <ImageUpload onModalClose={unhover} />}
                    <NcAvatar
                        width={200}
                        height={200}
                        fontSize={69}
                        src={user.profileImageUrl}
                        name={user.username} />
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column" width={1}>
                    <Typography variant="h4" color="text.primary" fontWeight="bold" mt={1}>
                        {user.firstName} {user.lastName}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="h6" color="text.tertiary">
                            @
                            {user.username}
                        </Typography>
                        <Typography color="text.tertiary" ml={1}>
                            {toLocalTime(user.createdAt.toString())}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Bio />
        </Container>
    );
}
