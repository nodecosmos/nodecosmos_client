import useHandleServerErrorAlert from '../../common/hooks/useHandleServerErrorAlert';
import ProfileImage from '../../features/users/components/profile-image/ProfileImage';
import useUsername from '../../features/users/hooks/useUsername';
import { selectUser } from '../../features/users/users.selectors';
import { showUserByUsername } from '../../features/users/users.thunks';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosError } from '../../types';
import { Box } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Show() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const username = useUsername();
    const user = useSelector(selectUser(username));
    const handleServerErrors = useHandleServerErrorAlert();
    const navigate = useNavigate();

    const showUser = useCallback(async () => {
        if (!user) {
            const response = await dispatch(showUserByUsername(username));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;
                handleServerErrors(error);

                if (error.status === 404) {
                    navigate('/404');
                }
                console.error(response);
            }
        }
    }, [dispatch, handleServerErrors, navigate, user, username]);

    useEffect(() => { showUser(); }, [showUser]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 4,
        }}>
            <ProfileImage />
        </Box>
    );
}
