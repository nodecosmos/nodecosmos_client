import useBooleanStateValue from '../../common/hooks/useBooleanStateValue';
import {
    SIDEBAR_WIDTH, MD_WO_SIDEBAR_WIDTH_SX, DISPLAY_MD_SX,
} from '../../features/app/constants';
import RecentNodes from '../../features/nodes/components/RecentNodes';
import Profile from '../../features/users/components/profile/Profile';
import useProfileConfirmation from '../../features/users/hooks/useProfileConfirmation';
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
    const [fetch, setFetched] = useBooleanStateValue(false);
    const { handleConfirmEmail } = useProfileConfirmation();
    const showUser = useCallback(async () => {
        const response = await dispatch(showUserByUsername(username));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            if (error.status === 404) {
                navigate('/404');
            }
            console.error(response);
        }
    }, [dispatch, navigate, username]);

    useEffect(() => {
        if (!fetch || !user) {
            showUser()
                .then(setFetched);
        }
    }, [fetch, setFetched, showUser, user]);

    const [confirmed, setConfirmed] = useBooleanStateValue(false);

    useEffect(() => {
        if (user && !confirmed) {
            handleConfirmEmail();
            setConfirmed();
        }
        // eslint-disable-next-line
    }, [user, confirmed, setConfirmed]);

    return (
        <Box height={1} display="flex">
            <Box
                width={SIDEBAR_WIDTH}
                display={DISPLAY_MD_SX}
                borderRight={1}
                height={1}
                borderColor="borders.1"
            >
                <RecentNodes />
            </Box>
            <Box
                className="overflow-auto"
                py={4}
                width={MD_WO_SIDEBAR_WIDTH_SX}
            >
                <Profile />
            </Box>
        </Box>
    );
}
