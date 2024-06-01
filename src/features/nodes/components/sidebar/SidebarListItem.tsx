import {
    ListItem, ListItemButton, ListItemIcon, Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface SidebarListItemProps {
    icon: React.ReactNode;
    title: string;
    to?: string;
    flip?: boolean;
    component?: React.ElementType;
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
    end?: boolean;
    selectedIcon?: React.ReactNode;
    color?: string;
}

export default function SidebarListItem(props: SidebarListItemProps) {
    const {
        to, icon, title, flip, component = NavLink,
        onClick, children, disabled, end = true, selectedIcon = icon,
        color,
    } = props;
    const location = useLocation();
    const selected = to && location.pathname.includes(to);

    return (
        <ListItem>
            <ListItemButton
                component={component}
                disabled={disabled}
                disableRipple
                onClick={onClick}
                {...(component === NavLink && {
                    to,
                    end,
                })}
            >
                <ListItemIcon sx={{
                    transform: flip ? 'scaleX(-1)' : 'none',
                    color: color ?? 'inherit',
                }}
                >
                    {selected ? selectedIcon : icon}
                </ListItemIcon>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width={1}>
                    <Typography
                        variant="subtitle1"
                        sx={{ color: color ?? 'inherit' }}>
                        {title}
                    </Typography>
                    {children}
                </Box>
            </ListItemButton>
        </ListItem>
    );
}
