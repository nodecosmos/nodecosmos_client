import {
  AccountTreeRounded,
  GestureRounded,
  GroupsRounded,
  AppRegistration,
  ArrowForward,
} from '@mui/icons-material';
import {
  List, ListItem, ListItemButton, ListItemIcon,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const [
  TREE,
  WORKFLOW,
  DRAWING,
  CONTRIBUTION_REQUEST,
  TOPICS,
] = ['TREE', 'WORKFLOW', 'DRAWING', 'CONTRIBUTION_REQUEST', 'TOPICS'];

export default function LandingNodeSidebar() {
  const [currentTab, setCurrentTab] = useState(TREE);

  return (
    <List style={{
      backgroundColor: '#2f3239',
      borderRadius: 24,
      padding: 8,
      boxShadow: '1px 2px 1px -1px rgb(0 0 0 / 25%),'
        + '0px 1px 1px 0px rgb(0 0 0 / 14%),'
        + '0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }}
    >
      <ListItem>
        <ListItemButton
          disableRipple
          onClick={() => setCurrentTab(TREE)}
          className={currentTab === TREE && 'active'}
        >
          <ListItemIcon>
            <AccountTreeRounded />
          </ListItemIcon>
          <Typography variant="body2">
            Tree
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          disableRipple
          onClick={() => setCurrentTab(WORKFLOW)}
          className={currentTab === WORKFLOW && 'active'}
        >
          <ListItemIcon>
            <ArrowForward />
          </ListItemIcon>
          <Typography variant="body2">
            Workflow
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          disableRipple
          onClick={() => setCurrentTab(DRAWING)}
          className={currentTab === DRAWING && 'active'}
        >
          <ListItemIcon>
            <GestureRounded />
          </ListItemIcon>
          <Typography variant="body2">
            Drawing
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          disableRipple
          onClick={() => setCurrentTab(CONTRIBUTION_REQUEST)}
          className={currentTab === CONTRIBUTION_REQUEST && 'active'}
        >
          <ListItemIcon>
            <AppRegistration />
          </ListItemIcon>
          <Typography variant="body2">
            Contribution Request
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton
          disableRipple
          onClick={() => setCurrentTab(TOPICS)}
          className={currentTab === TOPICS && 'active'}
        >
          <ListItemIcon>
            <GroupsRounded />
          </ListItemIcon>
          <Typography variant="body2">
            Topics
          </Typography>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
