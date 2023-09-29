import React from 'react';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import {
  faPenToSquare,
  faTrash,
  faArrowUpRightFromSquare,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/* mui */
import {
  IconButton,
  Box, Tooltip,
} from '@mui/material';

import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import LikeButton from '../../../nodes/components/tree-node-toolbar/LikeButton';
import NodeImporter from '../../../nodes/components/tree-node-toolbar/NodeImporter';
import useNodeRemover from '../../../nodes/hooks/useNodeRemover';
import useTmpChildNodeBuilder from '../../../nodes/hooks/useTmpChildNodeBuilder';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';

import useNodeTreeEvents from '../../hooks/useNodeTreeEvents';
import { selectTreeNodeAttribute } from '../../trees.selectors';
import { NODE_BUTTON_HEIGHT } from '../../trees.constants';

export default function NodeToolbar({ treeNodeId }) {
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const rootId = useSelector(selectNodeAttribute(nodeId, 'rootId'));

  const { editTreeNode } = useNodeTreeEvents(treeNodeId);
  const { removeNode } = useNodeRemover(nodeId);
  const { addChildNode, loading } = useTmpChildNodeBuilder(nodeId);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" height={NODE_BUTTON_HEIGHT}>
        <CircularProgress size={20} sx={{ color: 'secondary.main' }} />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      sx={{
        '.Item': {
          width: 31,
          height: 1,
          mx: 0.5,
          borderRadius: 1,
          '&:hover': { backgroundColor: 'toolbar.hover' },
        },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
      }}
    >
      <IconButton className="Item" onClick={addChildNode} aria-label="Add Node" sx={{ color: 'toolbar.red' }}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
      <IconButton className="Item" onClick={editTreeNode} aria-label="Edit Node" sx={{ color: 'toolbar.green' }}>
        <FontAwesomeIcon icon={faPenToSquare} />
      </IconButton>
      <IconButton className="Item" onClick={removeNode} aria-label="Delete Node" sx={{ color: 'toolbar.blue' }}>
        <FontAwesomeIcon icon={faTrash} />
      </IconButton>
      <LikeButton nodeId={nodeId} />
      <NodeImporter />

      <IconButton
        target="_blank"
        href={`/nodes/${rootId}/${nodeId}`}
        className="Item"
        aria-label="Open Node in New Tab"
        sx={{ color: 'toolbar.default' }}
      >
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
        />
      </IconButton>
    </Box>
  );
}

NodeToolbar.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
