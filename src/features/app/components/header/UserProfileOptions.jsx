import React from 'react';
import { faHeadSideBrain, faLightbulbOn, faRightFromBracket } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Slider } from '@mui/material';
import { selectCurrentUser } from '../../../authentication/authentication.selectors';

import useUserAuthentication from '../../../authentication/hooks/useUserAuthentication';
import SidebarListItem from '../../../nodes/components/sidebar/SidebarListItem';
import { selectTheme } from '../../app.selectors';
import { setTheme } from '../../appSlice';

/* nodecosmos */
import NcAvatar from '../../../../common/components/NcAvatar';

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
    const themesByValue = {
      0: 'dark',
      1: 'dimmed',
      2: 'light',
    };

    dispatch(setTheme(themesByValue[value]));
  };

  const marks = [
    {
      value: 0,
      label: 'dark',
    },
    {
      value: 1,
      label: 'dimmed',
    },
    {
      value: 2,
      label: 'light',
    },
  ];

  return (
    <>
      <NcAvatar model={{ name: currentUser.username }} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              p: 0,
              m: 0.25,
              width: 300,
              '.MuiList-root': { p: 0 },
              '.MuiListItemButton-root': { height: 62 },
            },
          },
        }}
      >
        <SidebarListItem
          to={`/user/${currentUser.username}`}
          icon={(<FontAwesomeIcon icon={faHeadSideBrain} />)}
          title="Profile"
        />
        <SidebarListItem
          onClick={handleLogout}
          icon={(<FontAwesomeIcon icon={faRightFromBracket} />)}
          component={null}
          title="Log Out"
        />
        <SidebarListItem
          icon={(<FontAwesomeIcon icon={faLightbulbOn} />)}
          title="Light Mode"
          component={null}
        >
          <Box width={175} display="flex" alignItems="center">
            <Slider
              aria-label="Custom marks"
              defaultValue={marks.findIndex((mark) => mark.label === theme)}
              step={1}
              min={0}
              max={2}
              valueLabelDisplay="auto"
              marks={marks}
              onChange={(_, value) => toggleTheme(_, value)}
            />
          </Box>
        </SidebarListItem>
      </Menu>
    </>
  );
}
