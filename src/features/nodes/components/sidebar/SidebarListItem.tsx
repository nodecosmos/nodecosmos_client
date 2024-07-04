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
    component?: React.ElementType;
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
    end?: boolean;
    selectedIcon?: React.ReactNode;
    color?: string;
    className?: string;
    iconClassName?: string;
}

export default function SidebarListItem(props: SidebarListItemProps) {
    const {
        to, icon, title, component = NavLink,
        onClick, children, disabled, end = true, selectedIcon = icon,
        color, className, iconClassName,
    } = props;
    const location = useLocation();
    const selected = to && location.pathname.includes(to);

    return (
        <ListItem>
            <ListItemButton
                className={className}
                component={component}
                disabled={disabled}
                disableRipple
                onClick={onClick}
                to={to}
                end={end}
            >
                <ListItemIcon className={`${iconClassName ?? 'mr-2'}`}>
                    {selected ? selectedIcon : icon}
                </ListItemIcon>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width={1}>
                    <Typography variant="subtitle2" color={color ?? 'inherit'}>
                        {title}
                    </Typography>
                    {children}
                </Box>
            </ListItemButton>
        </ListItem>
    );
}
