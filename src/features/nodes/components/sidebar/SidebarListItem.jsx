import React from 'react';
import {
  ListItem, ListItemButton, ListItemIcon, Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function SidebarListItem({
  to, icon, title, flip, component, onClick, children,
}) {
  return (
    <ListItem sx={{
      px: 0,
      py: 0,
      ':not(:first-of-type)': {
        pt: 0.5,
      },
    }}
    >
      <ListItemButton
        sx={{
          py: 1.5,
          borderRadius: 1.5,
          transition: 'all 150ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',
          color: 'background.list.default',
          '&.active': {
            backgroundColor: 'background.list.active',
            color: 'background.list.activeColor',
          },
        }}
        disableRipple
        component={component}
        to={to}
        end
        onClick={onClick}
      >
        <ListItemIcon sx={{
          minWidth: 0,
          mr: 2,
          color: 'background.list.default',
          svg: {
            fontSize: 18,
            width: 18,
            height: 18,
            '.active &': {
              color: 'background.list.activeColor',
            },
            transform: flip ? 'scaleX(-1)' : 'none',
          },
        }}
        >
          {icon}
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
};

SidebarListItem.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  flip: PropTypes.bool,
  component: PropTypes.elementType,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
