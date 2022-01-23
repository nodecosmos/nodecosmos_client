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
} from '@mui/icons-material';

export default function Sidebar(props) {
  const { micron } = props;

  return (
    <nav className="MaxHeightWithoutHeader flexColumnSpaceBetween">
      <List>
        <ListItem>
          <ListItemButton disableRipple exact component={NavLink} to={`/microns/${micron.id}`}>
            <ListItemIcon className="toolbarColor1">
              <TagRounded />
            </ListItemIcon>
            <Typography>
              Micron
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disableRipple exact component={NavLink} to={`/microns/${micron.id}/tree`}>
            <ListItemIcon className="toolbarColor2">
              <AccountTreeRounded />
            </ListItemIcon>
            <Typography>
              Tree
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disableRipple exact component={NavLink} to={`/microns/${micron.id}/drawing`}>
            <ListItemIcon className="toolbarColor3">
              <GestureRounded />
            </ListItemIcon>
            <Typography>
              Drawing
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disableRipple component={NavLink} to={`/microns/${micron.id}/contribution_requests`}>
            <ListItemIcon className="toolbarColor4">
              <CodeRounded />
            </ListItemIcon>
            <Typography>
              Contribution Requests
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disableRipple component={NavLink} to={`/microns/${micron.id}/topics`}>
            <ListItemIcon className="toolbarColor5">
              <GroupsRounded />
            </ListItemIcon>
            <Typography>
              Topics
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disableRipple component={NavLink} to={`/microns/${micron.id}/insights`}>
            <ListItemIcon className="toolbarColor6">
              <TimelineRounded />
            </ListItemIcon>
            <Typography>
              Insights
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemButton disableRipple component={NavLink} to={`/microns/${micron.id}/settings`}>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <Typography className="toolbarColor1">
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
