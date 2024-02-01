import UploadButton from './UploadButton';
import NcAvatar from '../../../../common/components/NcAvatar';
import useProfileUser from '../../hooks/useProfileUser';
import { Box } from '@mui/material';
import React from 'react';

export default function ProfileImage() {
    const user = useProfileUser();

    if (!user) {
        return null;
    }

    let profileImage;
    if (!user.profileImageURL) {
        profileImage = <NcAvatar width={296} height={296} fontSize={69} name={user.username} />;
    } else {
        profileImage = <img width={296} height={296} src={user.profileImageURL} alt={user.username} />;
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            { profileImage }
            <UploadButton />
        </Box>
    );
}
