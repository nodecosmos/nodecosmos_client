import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { List } from '@mui/material';
import {
  AccountTreeRounded,
  TagRounded,
  GestureRounded,
  SettingsOutlined,
  CodeRounded,
  TimelineRounded,
  GroupsRounded,
} from '@mui/icons-material';
import SidebarListItem from './SidebarListItem';

export default function Sidebar(props) {
  const { id } = props;

  return (
    <nav className="h-1 flexColumnSpaceBetween">
      <List>
        <SidebarListItem to={`/nodes/${id}`} icon={<TagRounded />} title="Node" />
        <SidebarListItem to={`/nodes/${id}/tree`} icon={<AccountTreeRounded />} title="Tree" />
        <SidebarListItem
          to={`/nodes/${id}/contribution_requests`}
          icon={<CodeRounded />}
          title="Contribution Requests"
        />
        <SidebarListItem to={`/nodes/${id}/drawing`} icon={<GestureRounded />} title="Drawing" />
        <SidebarListItem to={`/nodes/${id}/topics`} icon={<GroupsRounded />} title="Topics" />
        <SidebarListItem to={`/nodes/${id}/insights`} icon={<TimelineRounded />} title="Insights" />
      </List>
      <List>
        <SidebarListItem to={`/nodes/${id}/settings`} icon={<SettingsOutlined />} title="Settings" />
      </List>
    </nav>
  );
}

Sidebar.propTypes = {
  id: PropTypes.string.isRequired,
};
