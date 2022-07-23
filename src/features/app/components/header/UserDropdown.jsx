import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

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
import useUserAuthentication from '../../../authentication/services/useUserAuthentication';
import { setTheme } from '../../appSlice';

/* nodecosmos */
import NodeAvatar from '../NodeAvatar';

export default function UserDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const theme = useSelector((state) => state.app.theme);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const { handleLogout } = useUserAuthentication();

  const toggleTheme = (_event, value) => {
    dispatch(setTheme(value ? 'light' : 'dark'));
  };

  const lightThemeChecked = theme === 'light';

  if (isAuthenticated) {
    return (
      <>
        <NodeAvatar user={currentUser} onClick={handleClick} />
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
