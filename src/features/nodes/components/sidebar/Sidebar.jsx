import React from 'react';
import {
  faChartSimple,
  faCodeCommit,
  faCodePullRequest,
  faFolders,
  faGears,
  faUserGroup,
  faHashtag,
  faTable,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Box } from '@mui/material';
import * as PropTypes from 'prop-types';
import SidebarListItem from './SidebarListItem';

export default function Sidebar(props) {
  const { id, rootId } = props;

  const toPath = rootId ? `${rootId}/${id}` : id;

  return (
    <Box
      comopnent="nav"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      sx={{
        mt: 7,
        fontSize: 0.875,
      }}
    >
      <List sx={{ px: 1 }}>
        <SidebarListItem
          to={`${toPath}`}
          icon={(
            <FontAwesomeIcon
              icon={faHashtag}
            />
          )}
          title="Node"
        />
        <SidebarListItem
          to={`${toPath}/workflow`}
          flip
          icon={(
            <FontAwesomeIcon icon={faCodeCommit} />
          )}
          title="Workflow"
        />
        <SidebarListItem
          to={`${toPath}/contribution_requests`}
          icon={(
            <FontAwesomeIcon
              icon={faCodePullRequest}
            />
          )}
          title="Contribution Requests"
        />
        <SidebarListItem
          to={`${toPath}/topics`}
          icon={(
            <FontAwesomeIcon
              icon={faUserGroup}
            />
          )}
          title="Topics"
        />
        <SidebarListItem
          disabled
          to={`${toPath}/tasks_board`}
          icon={(
            <FontAwesomeIcon
              icon={faTable}
            />
          )}
          title="Tasks Board"
        />
        <SidebarListItem
          disabled
          to={`${toPath}/insights`}
          icon={(
            <FontAwesomeIcon
              icon={faChartSimple}
            />
          )}
          title="Insights"
        />
        <SidebarListItem
          to={`${toPath}/settings`}
          icon={(
            <FontAwesomeIcon
              icon={faGears}
            />
          )}
          title="Settings"
        />
      </List>
    </Box>
  );
}

Sidebar.defaultProps = {
  rootId: null,
};

Sidebar.propTypes = {
  id: PropTypes.string.isRequired,
  rootId: PropTypes.string,
};
