import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Box } from '@mui/material';
import {
  faRectangleCode,
  faHashtag,
  faCodeCommit,
  faDisplay,
  faPenToSquare,
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

  const hasBoxShadow = nodePaneContent === NODE_PANE_CONTENTS.markdown
    || nodePaneContent === NODE_PANE_CONTENTS.description;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={HEADER_HEIGHT}
      borderBottom={1}
      borderColor="borders.3"
      boxShadow={hasBoxShadow ? 'left.2' : 0}
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
          title="Edit Description"
          icon={faPenToSquare}
          color="toolbar.green"
          active={nodePaneContent === NODE_PANE_CONTENTS.wysiwyg}
          onClick={() => dispatch(setNodePaneContent(NODE_PANE_CONTENTS.wysiwyg))}
        />
        <ToolbarItem
          title="View Description"
          icon={faDisplay}
          color="toolbar.blue"
          active={nodePaneContent === NODE_PANE_CONTENTS.description}
          onClick={() => dispatch(setNodePaneContent(NODE_PANE_CONTENTS.description))}
        />
        <ToolbarItem
          title="Workflow"
          icon={faCodeCommit}
          color="toolbar.yellow"
          active={nodePaneContent === NODE_PANE_CONTENTS.workflow}
          onClick={() => dispatch(setNodePaneContent(NODE_PANE_CONTENTS.workflow))}
        />
      </ToolbarContainer>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ svg: { color: 'background.list.defaultColor' } }}
      >
        {title && <FontAwesomeIcon icon={faHashtag} />}
        <Typography
          align="center"
          variant="body1"
          color="text.secondary"
          ml={1}
          sx={{
            lineHeight: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
      </Box>
      <div />
    </Box>
  );
}
