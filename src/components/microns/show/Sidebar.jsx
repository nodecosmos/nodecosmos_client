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
  AccountTreeRounded,
  TagRounded,
  GestureRounded,
  SettingsOutlined,
  CodeRounded,
  TimelineRounded,
  GroupsRounded,
  AutoAwesomeMosaicRounded,
} from '@mui/icons-material';

export default function Sidebar(props) {
  const { micron } = props;
  const ListItemIconSx = { minWidth: 0, marginRight: 3 };

  return (
    <nav className="MaxHeightWithoutHeader flexColumnSpaceBetween BoxShadowRight BorderRight">
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
              Micron
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            exact
            component={NavLink}
            to={`/microns/${micron.id}/tree`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <AccountTreeRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              Tree
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            exact
            component={NavLink}
            to={`/microns/${micron.id}/drawing`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <GestureRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              Drawing
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
              <CodeRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              Contribution Requests
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            component={NavLink}
            to={`/microns/${micron.id}/topics`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <GroupsRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              Topics
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            disableRipple
            component={NavLink}
            to={`/microns/${micron.id}/insights`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <TimelineRounded />
            </ListItemIcon>
            <Typography fontWeight="normal">
              Insights
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemButton
            disableRipple
            component={NavLink}
            to={`/microns/${micron.id}/settings`}
          >
            <ListItemIcon sx={ListItemIconSx}>
              <SettingsOutlined />
            </ListItemIcon>
            <Typography fontWeight="normal">
              Micron Settings
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
