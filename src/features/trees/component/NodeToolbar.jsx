import React from 'react';
import { faLink } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

/* mui */
import {
  IconButton,
  Checkbox,
  Box, useTheme,
} from '@mui/material';

import AddRounded from '@mui/icons-material/AddRounded';
import Bookmark from '@mui/icons-material/Bookmark';
import BookmarkBorder from '@mui/icons-material/BookmarkBorder';
import EditRounded from '@mui/icons-material/EditRounded';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import Notifications from '@mui/icons-material/Notifications';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';

import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectTreeNodeAttribute } from '../trees.selectors';

export default function NodeToolbar(props) {
  const { treeNodeId } = props;
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const persistentId = useSelector(selectNodeAttribute(nodeId, 'persistentId'));

  const { addChildNode, editNode, removeNode } = useNodeTreeEvents(treeNodeId);

  const theme = useTheme();
  const { red, green, blue } = theme.palette.toolbar;

  return (
    <Box
      sx={{
        '.Item': {
          width: 26,
          height: 26,
          mx: 0.5,
          '&:hover': { background: 'rgb(56 195 197 / 14%)' },
        },
        '.Item:nth-of-type(1n)': { color: red },
        '.Item:nth-of-type(2n)': { color: blue },
        '.Item:nth-of-type(3n)': { color: green },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
      }}
    >
      <IconButton
        defaultComponent="a"
        target="_blank"
        href={`/nodes/${persistentId}`}
        className="Item"
        aria-label="Open Node in New Tab"
      >
        <FontAwesomeIcon
          icon={faLink}
        />
      </IconButton>
      <IconButton className="Item" onClick={addChildNode} aria-label="Add Node">
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={addChildNode} aria-label="Add Node">
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={addChildNode} aria-label="Add Node">
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={editNode} aria-label="Edit Node">
        <EditRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={removeNode} aria-label="Delete Node">
        <DeleteOutlineRounded fontSize="small" />
      </IconButton>
      <Checkbox
        className="Item"
        icon={<FavoriteBorder fontSize="small" />}
        checkedIcon={<Favorite fontSize="small" />}
        inputProps={{ 'aria-label': 'Favorite' }}
      />
      <Checkbox
        className="Item"
        icon={<BookmarkBorder fontSize="small" />}
        checkedIcon={<Bookmark fontSize="small" />}
        inputProps={{ 'aria-label': 'Bookmark' }}
      />
      <Checkbox
        className="Item"
        icon={<NotificationsOutlined fontSize="small" />}
        checkedIcon={<Notifications fontSize="small" />}
        inputProps={{ 'aria-label': 'Get Notified of Node Updates' }}
      />
    </Box>
  );
}

NodeToolbar.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
