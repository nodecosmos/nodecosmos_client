import React from 'react';
import { faPlus, faBookmark as faBookmarkSolid, faBell as faBellSolid } from '@fortawesome/pro-solid-svg-icons';
import {
  faPenToSquare,
  faTrash,
  faLink,
  faBookmark,
  faBell,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/* mui */
import {
  IconButton,
  Checkbox,
  Box, Tooltip,
} from '@mui/material';

import { useSelector } from 'react-redux';
import LikeButton from '../../nodes/components/tree-node-toolbar/LikeButton';
import NodeImporter from '../../nodes/components/tree-node-toolbar/NodeImporter';
import useNodeRemover from '../../nodes/hooks/useNodeRemover';
import useTmpChildNodeBuilder from '../../nodes/hooks/useTmpChildNodeBuilder';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectTreeNodeAttribute } from '../trees.selectors';

export default function NodeToolbar(props) {
  const { treeNodeId } = props;
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));
  const persistentRootId = useSelector(selectNodeAttribute(nodeId, 'persistentRootId'));

  const { editTreeNode } = useNodeTreeEvents(treeNodeId);
  const { removeNode } = useNodeRemover(nodeId);
  const { addChildNode } = useTmpChildNodeBuilder(nodeId);

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
      <Tooltip title="Add Node" placement="top">
        <IconButton className="Item" onClick={addChildNode} aria-label="Add Node" sx={{ color: 'toolbar.red' }}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Node" placement="top">

        <IconButton className="Item" onClick={editTreeNode} aria-label="Edit Node" sx={{ color: 'toolbar.green' }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Node" placement="top">
        <IconButton className="Item" onClick={removeNode} aria-label="Delete Node" sx={{ color: 'toolbar.blue' }}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Tooltip>
      <LikeButton nodeId={nodeId} />
      <NodeImporter />

      <Tooltip title="Open Node In New Tab" placement="top">
        <IconButton
          target="_blank"
          href={`/nodes/${persistentRootId}/${persistentId}`}
          className="Item"
          aria-label="Open Node in New Tab"
          sx={{ color: 'toolbar.blue' }}
        >
          <FontAwesomeIcon
            icon={faLink}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

NodeToolbar.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
