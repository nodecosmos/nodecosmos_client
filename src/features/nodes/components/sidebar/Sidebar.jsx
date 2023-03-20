import React from 'react';
import {
  faChartSimple,
  faDiagramNext,
  faCodePullRequest,
  faFolders,
  faGears,
  faUserGroup,
  faHashtag,
  faTable,
} from '@fortawesome/pro-light-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* mui */
import { List } from '@mui/material';
import Box from '@mui/material/Box';
import * as PropTypes from 'prop-types';

import SidebarListItem from './SidebarListItem';

export default function Sidebar(props) {
  const { id } = props;

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
          to={`${id}`}
          icon={(
            <FontAwesomeIcon
              icon={faHashtag}
            />
          )}
          title="Node"
        />
        <SidebarListItem
          to={`${id}/workflow`}
          icon={(
            <FontAwesomeIcon
              icon={faDiagramNext}
            />
          )}
          title="Workflow"
        />
        <SidebarListItem
          to={`${id}/contribution_requests`}
          icon={(
            <FontAwesomeIcon
              icon={faCodePullRequest}
            />
          )}
          title="Contribution Requests"
        />
        <SidebarListItem
          to={`${id}/tasks_board`}
          icon={(
            <FontAwesomeIcon
              icon={faTable}
            />
          )}
          title="Tasks Board"
        />
        <SidebarListItem
          to={`${id}/media`}
          icon={(
            <FontAwesomeIcon
              icon={faFolders}
            />
          )}
          title="Media"
        />
        <SidebarListItem
          to={`${id}/topics`}
          icon={(
            <FontAwesomeIcon
              icon={faUserGroup}
            />
          )}
          title="Topics"
        />
        <SidebarListItem
          to={`${id}/insights`}
          icon={(
            <FontAwesomeIcon
              icon={faChartSimple}
            />
          )}
          title="Insights"
        />
        <SidebarListItem
          to={`${id}/settings`}
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

Sidebar.propTypes = {
  id: PropTypes.string.isRequired,
};
