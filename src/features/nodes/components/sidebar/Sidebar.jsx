import React from 'react';
import * as PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiagramProject,
  faHashtag,
  faPhotoFilm,
  faUserGroup,
  faChartPie,
  faGears,
  faDiagramNext,
} from '@fortawesome/pro-light-svg-icons';

/* mui */
import { List } from '@mui/material';
import Box from '@mui/material/Box';

import SidebarListItem from './SidebarListItem';

export default function Sidebar(props) {
  const { id } = props;

  return (
    <Box
      comopnent="nav"
      height={1}
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      sx={{
        fontSize: 0.875,
      }}
    >
      <List>
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
              icon={faDiagramProject}
            />
          )}
          title="Contribution Requests"
        />
        <SidebarListItem
          to={`${id}/media`}
          icon={(
            <FontAwesomeIcon
              icon={faPhotoFilm}
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
              icon={faChartPie}
            />
          )}
          title="Insights"
        />
      </List>
      <List>
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
