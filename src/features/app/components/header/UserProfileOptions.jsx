import React from 'react';
import { faHeadSideBrain, faLightbulbOn, faRightFromBracket } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';

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
    dispatch(setTheme(value ? 'light' : 'dark'));
  };

  const lightThemeChecked = theme === 'light';

  return (
    <>
      <NcAvatar model={{ name: currentUser.username }} onClick={handleClick} />
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
            '.MuiList-root': { p: 0 },
            '.MuiListItemButton-root': { height: 62 },
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
          onClick={() => toggleTheme(null, !lightThemeChecked)}
        >
          <Switch checked={lightThemeChecked} onChange={toggleTheme} />
        </SidebarListItem>
      </Menu>
    </>
  );
}
