import React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* mui */
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';

import Person from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import LightMode from '@mui/icons-material/LightMode';
import { selectCurrentUser } from '../../../authentication/authentication.selectors';

import useUserAuthentication from '../../../authentication/hooks/useUserAuthentication';
import { selectTheme } from '../../app.selectors';
import { setTheme } from '../../appSlice';

/* nodecosmos */
import UserAvatar from '../../../../common/components/UserAvatar';

export default function UserProfileOptions() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);

  const currentUser = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);

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

  return (
    <>
      <UserAvatar user={currentUser} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            p: 0,
            m: 0.25,
            width: 300,
          },
        }}
      >
        <List sx={{ m: -0.5, p: 0 }}>
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
