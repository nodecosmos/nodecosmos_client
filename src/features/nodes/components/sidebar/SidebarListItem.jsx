import { ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SidebarListItem({ to, icon, title }) {
  return (
    <ListItem>
      <ListItemButton disableRipple exact component={NavLink} to={to}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <Typography>
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
