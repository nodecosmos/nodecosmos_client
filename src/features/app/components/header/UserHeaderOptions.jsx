import UserProfileOptions from './UserProfileOptions';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { REDIRECT_Q } from '../../../users/components/LoginForm';
import { selectIsAuthenticated } from '../../../users/users.selectors';
import { faBell, faMessages } from '@fortawesome/pro-regular-svg-icons';
import {
    Box,
    Button, Tooltip,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserHeaderOptions() {
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated) {
        return (
            <ToolbarContainer>
                <ToolbarItem title="messages" icon={faMessages} color="toolbar.green" />
                <ToolbarItem title="notifications" icon={faBell} color="toolbar.yellow" />
                <Tooltip title="Profile" placement="top">
                    <Box ml={1}>
                        <UserProfileOptions />
                    </Box>
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
