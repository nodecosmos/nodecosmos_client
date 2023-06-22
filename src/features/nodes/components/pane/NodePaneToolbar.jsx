import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  faRectangleCode, faHashtag,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faArrowProgress,
} from '@fortawesome/pro-regular-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../../app/constants';
import { NODE_PANE_CONTENTS } from '../../nodes.constants';

import { selectNodeDetailsAction, selectSelectedNode } from '../../nodes.selectors';
import { setNodePaneContent } from '../../nodesSlice';

export default function NodePaneToolbar() {
  const { title } = useSelector(selectSelectedNode);

  const dispatch = useDispatch();
  const nodePaneContent = useSelector(selectNodeDetailsAction);

  if (!title) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={HEADER_HEIGHT}
        borderBottom={1}
        borderColor="borders.4"
      >
        Select a node from the tree to view its description
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={HEADER_HEIGHT}
      borderBottom={1}
      borderColor="borders.4"
      // boxShadow="2"
    >
      <ToolbarContainer>
        <ToolbarItem
          title="Edit Description Markdown"
          icon={faRectangleCode}
          color="toolbar.lightRed"
          active={nodePaneContent === NODE_PANE_CONTENTS.markdown}
          onClick={() => dispatch(setNodePaneContent(NODE_PANE_CONTENTS.markdown))}
        />
        <ToolbarItem
          title="View Description"
          icon={faHashtag}
          color="toolbar.green"
          active={nodePaneContent === NODE_PANE_CONTENTS.description}
          onClick={() => dispatch(setNodePaneContent(NODE_PANE_CONTENTS.description))}
        />
        <ToolbarItem
          title="Workflow"
          icon={faArrowProgress}
          color="toolbar.blue"
          active={nodePaneContent === NODE_PANE_CONTENTS.workflow}
          onClick={() => dispatch(setNodePaneContent(NODE_PANE_CONTENTS.workflow))}
        />
      </ToolbarContainer>

      {nodePaneContent !== 'description' && (
      <Box display="flex" alignItems="center">
        {title && <FontAwesomeIcon icon={faHashtag} />}
        <Typography
          align="center"
          variant="body1"
          ml={1}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
      </Box>
      )}
      <div />
    </Box>
  );
}
