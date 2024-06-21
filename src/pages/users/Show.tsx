import { SIDEBAR_WIDTH } from '../../features/app/constants';
import Profile from '../../features/users/components/profile/Profile';
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
    const navigate = useNavigate();

    const showUser = useCallback(async () => {
        if (!user) {
            const response = await dispatch(showUserByUsername(username));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                if (error.status === 404) {
                    navigate('/404');
                }
                console.error(response);
            }
        }
    }, [dispatch, navigate, user, username]);

    useEffect(() => { showUser(); }, [showUser]);

    return (
        <Box height={1} display="flex">
            <Box
                width={SIDEBAR_WIDTH}
                display={{
                    md: 'block',
                    xs: 'none',
                }}
                borderRight={1}
                height={1}
                borderColor="borders.1"
            />
            <Box
                m={{
                    xs: 0,
                    md: 4,
                }}
                mt={{
                    xs: 1,
                    md: 4,
                }}
                width={{
                    md: `calc(100% - ${SIDEBAR_WIDTH})`,
                    xs: 1,
                }}>
                <Profile />
            </Box>
        </Box>
    );
}
