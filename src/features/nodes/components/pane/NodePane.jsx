import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import {
  selectNodeAttribute,
  selectNodeDetailsAction,
  selectSelectedNode,
  selectSelectedNodeId,
} from '../../nodes.selectors';
import { getNodeDescription } from '../../nodes.thunks';
import NodePaneToolbar from './NodePaneToolbar';
import NodePaneMarkdownEditor from './content/NodePaneMarkdownEditor';
import NodePaneDescription from './content/NodePaneDescription';
import NodePaneWorkflow from './content/NodePaneWorkflow';

export default function NodePane() {
  const selectedNodeId = useSelector(selectSelectedNodeId);
  const persistentId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentId'));
  const persistentRootId = useSelector(selectNodeAttribute(selectedNodeId, 'persistentRootId'));
  const nodePaneContent = useSelector(selectNodeDetailsAction);
  const {
    description,
  } = useSelector(selectSelectedNode);
  const isDescFetchedById = React.useRef({});

  const [loading, setLoading] = React.useState(!isDescFetchedById.current[persistentId]);
  const dispatch = useDispatch();

  const nodePaneContents = {
    description: <NodePaneDescription loading={loading} />,
    markdown: <NodePaneMarkdownEditor />,
    workflow: <NodePaneWorkflow />,
  };

  useEffect(() => {
    if (persistentId) {
      dispatch(getNodeDescription({
        rootId: persistentRootId,
        id: persistentId,
      })).then(() => {
        setLoading(false);
      });

      isDescFetchedById.current[persistentId] = true;
    }
  }, [dispatch, description, persistentId, persistentRootId]);

  return (
    <Box
      width={1}
      height={1}
      backgroundColor="background.6"
      sx={{ overflow: 'hidden' }}
      position="relative"
      zIndex={1}
    >
      <NodePaneToolbar id={selectedNodeId} />
      <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" pt={0.25}>
        {nodePaneContents[nodePaneContent]}
      </Box>
    </Box>
  );
}
