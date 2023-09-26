import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import {
  selectNodeAttribute,
  selectNodeDetailsAction,
  selectSelectedNodeId,
} from '../../nodes.selectors';
import { getNodeDescription } from '../../nodes.thunks';
import { setNodePaneContent } from '../../nodesSlice';
import { NODE_PANE_CONTENTS } from '../../nodes.constants';
import usePrevious from '../../../../common/hooks/usePrevious';
import NodePaneToolbar from './NodePaneToolbar';
import NodePaneMarkdownEditor from './content/NodePaneMarkdownEditor';
import NodePaneDescription from './content/NodePaneDescription';
import NodePaneWorkflow from './content/NodePaneWorkflow';
import NodePaneDescriptionEditor from './content/NodePaneDescriptionEditor';

export default function NodePane() {
  const id = useSelector(selectSelectedNodeId);
  const rootId = useSelector(selectNodeAttribute(id, 'rootId'));
  const isTemp = useSelector(selectNodeAttribute(id, 'isTemp'));
  const nodePaneContent = useSelector(selectNodeDetailsAction);
  const title = useSelector(selectNodeAttribute(id, 'title'));
  const dispatch = useDispatch();

  const nodePaneContents = {
    description: NodePaneDescription,
    markdown: NodePaneMarkdownEditor,
    editor: NodePaneDescriptionEditor,
    workflow: NodePaneWorkflow,
  };

  const SelectedComponent = nodePaneContents[nodePaneContent];

  const prevSelectedNodeId = usePrevious(id);

  useEffect(() => {
    if (id && rootId) {
      dispatch(getNodeDescription({
        rootId,
        id,
      }));
    }
  }, [dispatch, id, rootId]);

  useEffect(() => {
    if (prevSelectedNodeId !== id && nodePaneContent !== NODE_PANE_CONTENTS.workflow) {
      dispatch(setNodePaneContent(NODE_PANE_CONTENTS.description));
    }
  }, [dispatch, prevSelectedNodeId, id, nodePaneContent]);

  let blankStateMessage = null;

  if (!id) {
    blankStateMessage = 'Select a node from the tree to get details.';
  } else if (isTemp) {
    blankStateMessage = 'Selected node is not initialized yet.';

    if (!title) {
      blankStateMessage += ' Please add a title to create a node.';
    }
  }

  if (blankStateMessage) {
    return (
      <Box
        m={3}
        height={1}
        width={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h6" color="text.secondary" textAlign="center">
          {blankStateMessage}
        </Typography>
        <Typography variant="h5" color="text.secondary" textAlign="center" mt={1}>
          ¯\_(ツ)_/¯
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      width={1}
      height={1}
      sx={{ overflow: 'hidden' }}
      position="relative"
      zIndex={1}
    >
      <NodePaneToolbar id={id} />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto">
        <SelectedComponent />
      </Box>
    </Box>
  );
}
