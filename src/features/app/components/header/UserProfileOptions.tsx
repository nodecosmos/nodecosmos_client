import NcAvatar from '../../../../common/components/NcAvatar';
import { NodecosmosDispatch } from '../../../../store';
import SidebarListItem from '../../../nodes/components/sidebar/SidebarListItem';
import useUserAuthentication from '../../../users/hooks/useUserAuthentication';
import { selectCurrentUser } from '../../../users/users.selectors';
import { selectTheme } from '../../app.selectors';
import { setTheme } from '../../appSlice';
import {
    faLightbulbOn, faRightFromBracket, faMessageDots,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Slider } from '@mui/material';
import Menu from '@mui/material/Menu';
import React, {
    MouseEvent, useCallback, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MENU_SLOT_PROPS = {
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
};

const SLIDER_MARKS = [
    {
        value: 0,
        label: 'Dark',
    },
    {
        value: 1,
        label: 'Default',
    },
    {
        value: 2,
        label: 'Light',
    },
];

export default function UserProfileOptions() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const currentUser = useSelector(selectCurrentUser);
    const theme = useSelector(selectTheme);
    const { handleLogout } = useUserAuthentication();
    const handleClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => { setAnchorEl(null); }, []);
    const handleThemeChange = useCallback((_e: Event, value: number | number[]) => {
        dispatch(setTheme(value));
    }, [dispatch]);

    if (!currentUser) {
        throw new Error('User not found');
    }

    return (
        <Box ml={1}>
            <NcAvatar
                src={currentUser.profileImageUrl}
                name={currentUser.username}
                onClick={handleClick}
                size={30}
                fontSize={15}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={MENU_SLOT_PROPS}
            >
                <SidebarListItem
                    to={`/${currentUser.username}`}
                    icon={(<NcAvatar
                        src={currentUser.profileImageUrl}
                        name={currentUser.username}
                        onClick={handleClick}
                        size={30}
                        fontSize={15}
                    />)}
                    onClick={handleClose}
                    title="Profile"
                />
                <SidebarListItem
                    component="button"
                    onClick={handleLogout}
                    icon={(<FontAwesomeIcon icon={faRightFromBracket} />)}
                    title="Log Out"
                />
                <SidebarListItem
                    component="button"
                    icon={(<FontAwesomeIcon icon={faLightbulbOn} />)}
                    title="Theme"
                >
                    <Box width={150} mr={2} display="flex" alignItems="center">
                        <Slider
                            aria-label="Theme"
                            value={Number(theme)}
                            color="secondary"
                            step={1}
                            min={0}
                            max={2}
                            valueLabelDisplay="off"
                            track={false}
                            marks={SLIDER_MARKS}
                            onChange={handleThemeChange}
                        />
                    </Box>
                </SidebarListItem>
                <SidebarListItem
                    onClick={handleClose}
                    to="/contact"
                    icon={(<FontAwesomeIcon icon={faMessageDots} />)}
                    title="Contact Us"
                />
            </Menu>
        </Box>
    );
}
