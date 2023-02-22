import React from 'react';
import * as PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiagramNested,
  faCardsBlank,
  faChartSimpleHorizontal,
  faUserGroup,
  faChartPie,
  faGears,
  faIcons,
} from '@fortawesome/pro-solid-svg-icons';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

/* mui */
import { List } from '@mui/material';
import Box from '@mui/material/Box';
import NodecosmosIcon from '../../../../common/components/NodecosmosIcon';

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
      <List sx={{ p: 1 }}>
        <SidebarListItem
          to={`${id}`}
          icon={(
            <NodecosmosIcon />
          )}
          title="Node"
        />
        <SidebarListItem
          to={`${id}/workflow`}
          icon={(
            <FontAwesomeIcon
              icon={faDiagramNested}
            />
          )}
          title="Workflow"
        />
        <SidebarListItem
          to={`${id}/contribution_requests`}
          icon={(
            <AccountTreeRoundedIcon />
          )}
          title="Contribution Requests"
        />
        <SidebarListItem
          to={`${id}/media`}
          icon={(
            <FontAwesomeIcon
              icon={faIcons}
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
