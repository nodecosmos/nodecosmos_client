import React from 'react';
import { faBell, faMessages } from '@fortawesome/pro-regular-svg-icons';
import {
    Box,
    Button, Tooltip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { selectIsAuthenticated } from '../../../authentication/authentication.selectors';
import UserProfileOptions from './UserProfileOptions';

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
            <Button component={Link} to="/auth/login" color="primary" sx={{ mr: 1 }}>
        Log in
            </Button>
            <Button
                component={Link}
                to="/auth/signup"
                variant="outlined"
                className="MicroButton focused"
            >
        Sign Up
            </Button>
        </Box>
    );
}
