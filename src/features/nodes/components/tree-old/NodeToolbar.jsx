import React from 'react';
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
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import SearchRounded from '@mui/icons-material/SearchRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import Notifications from '@mui/icons-material/Notifications';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';

import useNodeTreeEvents from '../../hooks/tree-old/useNodeTreeEvents';

export default function NodeToolbar(props) {
  const { id } = props;
  const { onNodeAdd, handleNodeDeletion } = useNodeTreeEvents({ id });

  return (
    <Box className="Toolbar">
      <IconButton className="Item" onClick={onNodeAdd}>
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item">
        <EditRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={() => handleNodeDeletion(id)}>
        <DeleteOutlineRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item">
        <SearchRounded fontSize="small" />
      </IconButton>
      <Checkbox
        className="Item"
        icon={<FavoriteBorder fontSize="small" />}
        checkedIcon={<Favorite fontSize="small" />}
      />
      <Checkbox
        className="Item"
        icon={<BookmarkBorder fontSize="small" />}
        checkedIcon={<Bookmark fontSize="small" />}
      />
      <Checkbox
        className="Item"
        icon={<NotificationsOutlined fontSize="small" />}
        checkedIcon={<Notifications fontSize="small" />}
      />
    </Box>
  );
}

NodeToolbar.propTypes = {
  id: PropTypes.string.isRequired,
};
