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
  const ListItemIconSx = { minWidth: 0, marginRight: 3 };

  return (
    <nav className="MaxHeightWithoutHeader flexColumnSpaceBetween">
      <List>
        <ListItem>
          <ListItemButton
            disableRipple
            exact
            component={NavLink}
            to={`/microns/${micron.id}`}
          >
            <ListItemIcon sx={ListItemIconSx} className="toolbarColor1">
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
            <ListItemIcon sx={ListItemIconSx} className="toolbarColor2">
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
            <ListItemIcon sx={ListItemIconSx} className="toolbarColor3">
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
            <ListItemIcon sx={ListItemIconSx} className="toolbarColor4">
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
            <ListItemIcon sx={ListItemIconSx} className="toolbarColor5">
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
            <ListItemIcon sx={ListItemIconSx} className="toolbarColor6">
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
            <Typography fontWeight="normal" className="toolbarColor1">
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
