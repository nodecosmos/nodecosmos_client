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
      pl={1}
    >
      <ToolbarContainer
        hasText
        round={false}
        mr={1}
        showIndicator={false}
        size={32}
        borderRadius={2}
        hoverColor="background.7"
        activeColor="background.7"
      >
        <ToolbarItem
          title="Conversation"
          icon={faComments}
          color="text.primary"
          titleAsTooltip={false}
          to="."
        />
        <ToolbarItem
          title="Tree changes"
          icon={faDiagramNested}
          color="text.primary"
          titleAsTooltip={false}
          to="tree"
        />
        <ToolbarItem
          title="Workflow changes"
          icon={faCodeCommit}
          color="text.primary"
          titleAsTooltip={false}
          to="workflow"
        />
        <ToolbarItem
          title="Commits"
          icon={faListTree}
          color="text.primary"
          titleAsTooltip={false}
          to="commits"
        />
      </ToolbarContainer>
    </Box>
  );
}
