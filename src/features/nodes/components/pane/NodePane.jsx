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
import NodePaneWysiwygEditor from './content/NodePaneWysiwygEditor';

export default function NodePane() {
  const selectedNodeId = useSelector(selectSelectedNodeId);
  const persistentId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentId'));
  const persistentRootId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentRootId'));
  const nodePaneContent = useSelector(selectNodeDetailsAction);
  const dispatch = useDispatch();

  const nodePaneContents = {
    description: <NodePaneDescription />,
    markdown: <NodePaneMarkdownEditor />,
    wysiwyg: <NodePaneWysiwygEditor />,
    workflow: <NodePaneWorkflow />,
  };

  const prevSelectedNodeId = usePrevious(selectedNodeId);

  useEffect(() => {
    if (persistentId && persistentRootId) {
      dispatch(getNodeDescription({
        rootId: persistentRootId,
        id: persistentId,
      }));
    }
  }, [dispatch, persistentId, persistentRootId]);

  useEffect(() => {
    if (prevSelectedNodeId !== selectedNodeId && nodePaneContent !== NODE_PANE_CONTENTS.workflow) {
      dispatch(setNodePaneContent(NODE_PANE_CONTENTS.description));
    }
  }, [dispatch, prevSelectedNodeId, selectedNodeId, nodePaneContent]);

  if (!selectedNodeId) {
    return (
      <Box m={3} height={1} width={1} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Select a node from the tree to view its description
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
      backgroundColor="background.5"
      sx={{ overflow: 'hidden' }}
      position="relative"
      zIndex={1}
    >
      <NodePaneToolbar id={selectedNodeId} />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto">
        {nodePaneContents[nodePaneContent]}
      </Box>
    </Box>
  );
}
