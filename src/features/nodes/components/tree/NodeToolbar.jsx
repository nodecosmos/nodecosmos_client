import React from 'react';
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

import useNodeTreeEvents from '../../hooks/tree/useNodeTreeEvents';

export default function NodeToolbar(props) {
  const { id } = props;
  const { addNode, editNode, removeNode } = useNodeTreeEvents(id);

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
        '.Item:nth-of-type(1)': { color: red },
        '.Item:nth-of-type(2)': { color: blue },
        '.Item:nth-of-type(3)': { color: green },
        '.MuiSvgIcon-root': { fontSize: 16 },
      }}
    >
      <IconButton className="Item" onClick={addNode} aria-label="Add Node">
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={editNode} aria-label="Edit Node">
        <EditRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={() => removeNode(id)} aria-label="Delete Node">
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
  id: PropTypes.string.isRequired,
};
