/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  ListItem, ListItemButton, ListItemIcon, Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function SidebarListItem({
  to, icon, title, flip, component, onClick, children, disabled, end, selected,
}) {
  return (
    <ListItem>
      <ListItemButton
        disabled={disabled}
        disableRipple
        component={component}
        to={to}
        onClick={onClick}
        selected={selected}
        {...(component === NavLink && { end, relative: true })}
      >
        <ListItemIcon sx={{
          transform: flip ? 'scaleX(-1)' : 'none',
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
  disabled: false,
  end: true,
  selected: null,
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
  selected: PropTypes.bool,
};
