import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { List } from '@mui/material';

import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import TagRounded from '@mui/icons-material/TagRounded';
import GestureRounded from '@mui/icons-material/GestureRounded';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import CodeRounded from '@mui/icons-material/CodeRounded';
import TimelineRounded from '@mui/icons-material/TimelineRounded';
import GroupsRounded from '@mui/icons-material/GroupsRounded';

import SidebarListItem from './SidebarListItem';

export default function Sidebar(props) {
  const { id } = props;

  return (
    <nav className="flexColumnSpaceBetween" style={{ height: '100%' }}>
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
