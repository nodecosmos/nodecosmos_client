import React from 'react';
import { faBell, faMessages } from '@fortawesome/pro-solid-svg-icons';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* mui */
import {
  Button, Tooltip,
} from '@mui/material';

import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { selectIsAuthenticated } from '../../../authentication/authentication.selectors';
import UserProfileOptions from './UserProfileOptions';

export default function UserHeaderOptions() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return (
      <ToolbarContainer fontSize="0.95rem">
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
        to="/auth/login"
        variant="outlined"
        className="MicroButton focused"
      >
        Sign Up
      </Button>
    </Box>
  );
}
