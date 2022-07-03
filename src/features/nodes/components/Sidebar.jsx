import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
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
  const { id } = props;

  return (
    <nav className="h-1 flexColumnSpaceBetween">
      <List>
        <ListItem>
          <ListItemButton disableRipple exact component={NavLink} to={`/nodes/${id}`}>
            <ListItemIcon>
              <TagRounded />
            </ListItemIcon>
            <Typography>
              Node
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disableRipple exact component={NavLink} to={`/nodes/${id}/tree`}>
            <ListItemIcon>
              <AccountTreeRounded />
            </ListItemIcon>
            <Typography>
              Tree
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disableRipple component={NavLink} to={`/nodes/${id}/contribution_requests`}>
            <ListItemIcon>
              <CodeRounded />
            </ListItemIcon>
            <Typography>
              Contribution Requests
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton disabled disableRipple exact component={NavLink} to={`/nodes/${id}/drawing`}>
            <ListItemIcon>
              <GestureRounded />
            </ListItemIcon>
            <Typography>
              Drawing
            </Typography>
          </ListItemButton>
          <Tooltip title="Construction" placement="right">
            <Box>
              🚧
            </Box>
          </Tooltip>
        </ListItem>
        <ListItem>
          <ListItemButton disabled disableRipple component={NavLink} to={`/nodes/${id}/topics`}>
            <ListItemIcon>
              <GroupsRounded />
            </ListItemIcon>
            <Typography>
              Topics
            </Typography>
          </ListItemButton>
          <Tooltip title="Work in progress" placement="right"><Box>🚧</Box></Tooltip>
        </ListItem>
        <ListItem>
          <ListItemButton disabled disableRipple component={NavLink} to={`/nodes/${id}/insights`}>
            <ListItemIcon>
              <TimelineRounded />
            </ListItemIcon>
            <Typography>
              Insights
            </Typography>
          </ListItemButton>
          <Tooltip title="Work in progress" placement="right">
            <Box>
              🚧
            </Box>
          </Tooltip>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemButton disableRipple component={NavLink} to={`/nodes/${id}/settings`}>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <Typography>
              Node Settings
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}

Sidebar.propTypes = {
  id: PropTypes.string.isRequired,
};
