import React from 'react';
import { faHeadSideBrain, faLightbulbOn, faRightFromBracket } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@mui/material/Menu';
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
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const dispatch = useDispatch();
  const { handleLogout } = useUserAuthentication();
  const themesBySliderValue = {
    0: 'dark',
    1: 'dimmed',
    2: 'light',
  };
  const valuesByTheme = {
    dark: 0,
    dimmed: 1,
    light: 2,
  };

  const toggleTheme = (_event, value) => {
    dispatch(setTheme(themesBySliderValue[value]));
  };

  return (
    <>
      <NcAvatar
        model={{ name: currentUser.username }}
        onClick={handleClick}
        width={30}
        height={30}
        fontSize={15}
      />
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
              width: 350,
              '.MuiList-root': { p: 0 },
              '.MuiListItemButton-root': { minHeight: 62 },
              '.MuiSlider-markLabel': {
                fontSize: 12,
                textTransform: 'capitalize',
              },
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
          title="Theme"
          component={null}
        >
          <Box width={150} mr={2} display="flex" alignItems="center">
            <Slider
              aria-label="Theme"
              defaultValue={valuesByTheme[theme]}
              color="secondary"
              step={1}
              min={0}
              max={2}
              valueLabelDisplay="off"
              track={false}
              marks={[
                {
                  value: 0,
                  label: 'dark',
                },
                {
                  value: 1,
                  label: 'Default',
                },
                {
                  value: 2,
                  label: 'light',
                },
              ]}
              onChange={(_, value) => toggleTheme(_, value)}
            />
          </Box>
        </SidebarListItem>
      </Menu>
    </>
  );
}
