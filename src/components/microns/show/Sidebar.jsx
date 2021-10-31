import Typography from '@mui/material/Typography';
import React from 'react';
import { NavLink } from 'react-router-dom';
import * as PropTypes from 'prop-types';
/* mui */
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import {
  AddRounded,
  AccountTreeRounded,
  TagRounded,
  GestureRounded,
} from '@mui/icons-material';

export default function Sidebar(props) {
  const { micron } = props;
  const ListItemIconSx = { minWidth: 0, marginRight: 3 };

  return (
    <nav>
      <List>
        <ListItem>
          <ListItemButton
            disableRipple
            exact
            component={NavLink}
            to={`/microns/${micron.id}`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <TagRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              {micron.title.toLowerCase()}
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            component={NavLink}
            to={`/microns/${micron.id}/new`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <AddRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              new micron
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            component={NavLink}
            to={`/microns/${micron.id}/contribution_requests`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <AccountTreeRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              contribution requests
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            component={NavLink}
            to={`/microns/${micron.id}/drawing`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <GestureRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              drawing
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}

Sidebar.propTypes = {
  micron: PropTypes.object.isRequired,
};
