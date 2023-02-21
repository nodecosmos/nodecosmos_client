import React from 'react';
import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function SidebarListItem({ to, icon, title }) {
  return (
    <ListItem sx={{
      px: 1,
      py: 0.5,
    }}
    >
      <ListItemButton
        sx={{
          p: 1,
          borderRadius: 1.5,
          transition: 'all 150ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',
          '&:hover, &.active': {
            backgroundColor: 'background.list.active',
          },
          '&.active': {
            color: 'text.contrast',
          },
        }}
        disableRipple
        component={NavLink}
        to={to}
        relative
        end
      >
        <ListItemIcon sx={{
          transition: 'all 350ms cubic-bezier(0.0, 0, 0.2, 1) 2ms',
          minWidth: 0,
          padding: 1.65,
          borderRadius: 1.5,

          backgroundColor: 'background.list.iconBackground',
          boxShadow: '1',
          color: 'background.list.iconForeground',
          svg: {
            fontSize: '0.9rem',
            '.active &': {
              color: 'text.contrast',
            },
          },
        }}
        >
          {icon}
        </ListItemIcon>
        <Typography variant="subtitle2" ml={2} sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}

SidebarListItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
