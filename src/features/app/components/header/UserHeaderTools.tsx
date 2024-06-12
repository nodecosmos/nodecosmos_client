import UserProfileOptions from './UserProfileOptions';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import Notifications from '../../../notifications/components/Notifications';
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
                <Notifications />
                <Tooltip title="Profile" placement="top">
                    <UserProfileOptions />
                </Tooltip>
            </ToolbarContainer>
        );
    }

    // if it's not authenticated, show the login and signup buttons
    return (
        <Box display="flex" justifyContent="end" height={30} width={150}>
            <Button
                component={Link}
                color="primary"
                sx={{ mr: 1 }}
                to={`/auth/login?${REDIRECT_Q}=${btoa(window.location.href)}`}
            >
                Log in
            </Button>
            <Button
                component={Link}
                variant="outlined"
                className="LogoButton focused"
                to={`/auth/signup?${REDIRECT_Q}=${btoa(window.location.href)}`}
            >
                Sign Up
            </Button>
        </Box>
    );
}
