import { NodecosmosDispatch } from '../../../../store';
import SidebarListItem from '../../../nodes/components/sidebar/SidebarListItem';
import { selectIsAuthenticated } from '../../../users/users.selectors';
import { selectTheme } from '../../app.selectors';
import { setTheme } from '../../appSlice';
import {
    faGear, faMessageDots, faLightbulbOn, 
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Slider,
} from '@mui/material';
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
            width: 320,
            '.MuiList-root': { p: 0 },
            '.MuiListItemButton-root': { minHeight: 62 },
            '.MuiSlider-markLabel': {
                fontSize: 12,
                textTransform: 'capitalize',
                top: 35,
            },
            '.MuiSlider-root': { padding: '16px 0' },
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

export default function ThemeMenu() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [themeAnchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleThemeMenuClick = useCallback((event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => { setAnchorEl(null); }, []);
    const handleThemeChange = useCallback((_e: Event, value: number | number[]) => {
        dispatch(setTheme(value));
    }, [dispatch]);
    const theme = useSelector(selectTheme);

    if (isAuthenticated) {
        return null;
    }

    // if it's not authenticated, show the login and signup buttons
    return (
        <Box width={1} height={1} position="relative" className="display-flex align-center">
            <IconButton
                sx={{
                    position: 'absolute',
                    right: 0,
                }}
                className="Item fs-18 toolbar-default w-35 h-35"
                aria-label="Choose Theme"
                onClick={handleThemeMenuClick}
            >
                <FontAwesomeIcon icon={faGear} />
            </IconButton>
            <Menu
                anchorEl={themeAnchorEl}
                open={Boolean(themeAnchorEl)}
                onClose={handleClose}
                slotProps={MENU_SLOT_PROPS}
            >
                <SidebarListItem
                    onClick={handleClose}
                    to="/contact"
                    icon={(<FontAwesomeIcon icon={faMessageDots} />)}
                    title="Contact Us"
                />
                <SidebarListItem
                    iconClassName="mr-2 fs-18"
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
            </Menu>
        </Box>
    );
}
