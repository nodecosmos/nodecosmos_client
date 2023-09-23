import React from 'react';
import { Box } from '@mui/material';
import {
  faCodeCommit, faDiagramNested, faListTree, faComments,
} from '@fortawesome/pro-light-svg-icons';

import { HEADER_HEIGHT } from '../../app/constants';
import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';

export default function ContributionRequestsShowToolbar() {
  return (
    <Box
      display="flex"
      alignItems="center"
      height={HEADER_HEIGHT}
      borderBottom={1}
      borderColor="borders.2"
    >
      <Box>
        <ToolbarContainer hasText round={false} mr={0} showIndicator={false}>
          <ToolbarItem
            title="Conversation"
            icon={faComments}
            color="secondary.main"
            titleAsTooltip={false}
            to="."
          />
          <ToolbarItem
            title="Tree"
            icon={faDiagramNested}
            color="secondary.main"
            titleAsTooltip={false}
            to="tree"
          />
          <ToolbarItem
            title="Workflow"
            icon={faCodeCommit}
            color="secondary.main"
            titleAsTooltip={false}
            to="workflow"
          />
          <ToolbarItem
            title="Commits"
            icon={faListTree}
            color="secondary.main"
            titleAsTooltip={false}
            to="commits"
          />
        </ToolbarContainer>
      </Box>
    </Box>
  );
}
