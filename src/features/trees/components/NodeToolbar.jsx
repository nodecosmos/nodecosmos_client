import React from 'react';
import { faLink } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/* mui */
import {
  IconButton,
  Checkbox,
  Box,
} from '@mui/material';

import AddRounded from '@mui/icons-material/AddRounded';
import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import EditRounded from '@mui/icons-material/EditRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import Notifications from '@mui/icons-material/Notifications';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import { useSelector } from 'react-redux';
import LikeButton from '../../nodes/components/LikeButton';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectTreeNodeAttribute } from '../trees.selectors';

export default function NodeToolbar(props) {
  const { treeNodeId } = props;
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));

  const { addChildNode, editNode, removeNode } = useNodeTreeEvents(treeNodeId);

  return (
    <Box
      display="flex"
      sx={{
        '.Item': {
          width: 28,
          height: 28,
          mx: 0.5,
          '&:hover': { backgroundColor: 'toolbar.hover' },
        },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
      }}
    >
      <IconButton className="Item" onClick={addChildNode} aria-label="Add Node" sx={{ color: 'toolbar.red' }}>
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={editNode} aria-label="Edit Node" sx={{ color: 'toolbar.green' }}>
        <EditRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={removeNode} aria-label="Delete Node" sx={{ color: 'toolbar.blue' }}>
        <DeleteOutlineRounded fontSize="small" />
      </IconButton>
      <LikeButton nodeId={nodeId} />
      <Checkbox
        className="Item"
        icon={<BookmarkBorder fontSize="small" />}
        checkedIcon={<Bookmark fontSize="small" />}
        inputProps={{ 'aria-label': 'Bookmark' }}
        sx={{ color: 'toolbar.green' }}
      />
      <Checkbox
        className="Item"
        icon={<NotificationsOutlined fontSize="small" />}
        checkedIcon={<Notifications fontSize="small" />}
        inputProps={{ 'aria-label': 'Get Notified of Node Updates' }}
        sx={{ color: 'toolbar.blue' }}
      />
      <IconButton
        target="_blank"
        href={`/nodes/${persistentId}`}
        className="Item"
        aria-label="Open Node in New Tab"
        sx={{ color: 'background.list.default' }}
      >
        <FontAwesomeIcon
          icon={faLink}
        />
      </IconButton>
    </Box>
  );
}

NodeToolbar.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
