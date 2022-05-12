import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
/* mui */
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import {
  Person,
  Logout,
  LightMode,
} from '@mui/icons-material';
import { logout, setTheme } from '../../actions';

/* micro */
import MicroAvatar from '../nodecosmos/MicroAvatar';

function UserDropdown(props) {
  const { currentUser, isAuthenticated, theme } = props;
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

  const toggleTheme = (_event, value) => {
    dispatch(setTheme(value ? 'light' : 'dark'));
  };

  const lightThemeChecked = theme === 'light';

  if (isAuthenticated) {
    return (
      <>
        <MicroAvatar user={currentUser} onClick={handleClick} />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            className: 'Border',
            elevation: 4,
            sx: {
              p: 0,
              mt: '2px',
              ml: '3px',
              width: 300,
            },
          }}
        >
          <List sx={{ m: '-4px', p: 0 }}>
            <ListItem>
              <ListItemButton onClick={handleClose} component={Link} to={`/user/${currentUser.username}`}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <Typography fontWeight="normal">
                  Profile
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <Typography fontWeight="normal">
                  Logout
                </Typography>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton disableRipple onClick={() => toggleTheme(null, !lightThemeChecked)}>
                <ListItemIcon>
                  <LightMode />
                </ListItemIcon>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Typography fontWeight="normal">
                    Light mode
                  </Typography>
                  <Switch checked={lightThemeChecked} onChange={toggleTheme} />
                </Box>
              </ListItemButton>
            </ListItem>
          </List>
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
  theme: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { currentUser, isAuthenticated } = state.auth;
  return { currentUser, isAuthenticated, theme: state.app.theme };
}

export default connect(mapStateToProps)(UserDropdown);
