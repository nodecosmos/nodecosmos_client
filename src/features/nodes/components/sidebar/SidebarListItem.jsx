import React from 'react';
import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function SidebarListItem({
  to, icon, title, flip,
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
        component={NavLink}
        to={to}
        relative
        end
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
        <Typography variant="subtitle2">
          {title}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}

SidebarListItem.defaultProps = {
  flip: false,
};

SidebarListItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  flip: PropTypes.bool,
};
