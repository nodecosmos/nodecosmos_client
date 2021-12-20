import Box from '@mui/material/Box';
import { orange } from '@mui/material/colors';
import green from '@mui/material/colors/green';
import red from '@mui/material/colors/red';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
/* mui */
import {
  Button, Typography, ListItemIcon, ListItemText,
} from '@mui/material';
import {
  Person,
  Logout,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import { logout } from '../../actions';

/* micro */
import MicroAvatar from '../microcosmos/MicroAvatar';

function UserDropdown(props) {
  const { currentUser, isAuthenticated } = props;
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  if (isAuthenticated) {
    return (
      <>
        <MicroAvatar user={currentUser} onClick={handleClick} />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            className: 'DropdownPaper',
            sx: {
              mt: 2,
              width: 300,
              overflow: 'visible',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={handleClose} component={Link} to={`/user/${currentUser.username}`}>
            <ListItemIcon>
              <Avatar>
                <Person fontSize="small" />
              </Avatar>
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ mt: 1 }}>
            <Avatar>
              <Logout fontSize="small" />
            </Avatar>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <Button component={Link} to="/login" color="primary" className="MicroButton">
      <Typography variant="body1">
        Log In
      </Typography>
    </Button>
  );
}

UserDropdown.propTypes = {
  currentUser: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { currentUser, isAuthenticated } = state.auth;
  return { currentUser, isAuthenticated };
}

export default connect(mapStateToProps)(UserDropdown);
