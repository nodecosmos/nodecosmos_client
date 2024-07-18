import UserProfileOptions from './UserProfileOptions';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import NotificationsButton from '../../../notifications/components/NotificationsButton';
import { REDIRECT_Q } from '../../../users/components/LoginForm';
import { selectIsAuthenticated } from '../../../users/users.selectors';
import {
    Box,
    Button, Tooltip,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserHeaderTools() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return (
            <ToolbarContainer size={35} showIndicator={false} hasBg borderRadius="50%" fontSize={16}>
                <NotificationsButton />
                <Tooltip title="Profile" placement="top">
                    <div>
                        <UserProfileOptions />
                    </div>
                </Tooltip>
            </ToolbarContainer>
        );
    }

    // if it's not authenticated, show the login and signup buttons
    return (
        <Box display="flex" justifyContent="end" height={30}>
            <Button
                component={Link}
                color="primary"
                to={`/auth/login?${REDIRECT_Q}=${btoa(window.location.href)}`}
            >
                Log in
            </Button>
            <Button
                className="nowrap ml-1"
                variant="outlined"
                component={Link}
                color="primary"
                to={`/auth/signup?${REDIRECT_Q}=${btoa(window.location.href)}`}
            >
                Sign up
            </Button>
        </Box>
    );
}
