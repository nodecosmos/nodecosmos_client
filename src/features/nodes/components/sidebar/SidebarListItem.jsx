/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    ListItem, ListItemButton, ListItemIcon, Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';

export default function SidebarListItem(props) {
    const {
        to, icon, title, flip, component, onClick, children, disabled, end, selectedIcon,
    } = props;
    const location = useLocation();

    const selected = location.pathname.includes(to);

    return (
        <ListItem>
            <ListItemButton
                disabled={disabled}
                disableRipple
                component={component}
                to={to}
                onClick={onClick}
                {...(component === NavLink && { end, relative: true })}
            >
                <ListItemIcon sx={{
                    transform: flip ? 'scaleX(-1)' : 'none',
                }}
                >
                    {selectedIcon && selected ? selectedIcon : icon}
                </ListItemIcon>
                <Box display="flex" justifyContent="space-between" alignItems="center" width={1}>
                    <Typography variant="subtitle2">
                        {title}
                    </Typography>
                    {children}
                </Box>
            </ListItemButton>
        </ListItem>
    );
}

SidebarListItem.defaultProps = {
    flip: false,
    component: NavLink,
    onClick: () => {},
    to: null,
    children: null,
    disabled: false,
    end: true,
    selectedIcon: null,
};

SidebarListItem.propTypes = {
    to: PropTypes.string,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    flip: PropTypes.bool,
    component: PropTypes.elementType,
    onClick: PropTypes.func,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    end: PropTypes.bool,
    selectedIcon: PropTypes.node,
};
