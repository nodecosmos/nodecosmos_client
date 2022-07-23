import React from 'react';
import PropTypes from 'prop-types';

/* mui */
import {
  IconButton,
  Checkbox,
  Box,
} from '@mui/material';

import {
  AddRounded,
  Bookmark,
  BookmarkBorder,
  EditRounded,
  Favorite,
  FavoriteBorder,
  SearchRounded,
  DeleteOutlineRounded,
  Notifications,
  NotificationsOutlined,
} from '@mui/icons-material';
import useNodeTreeEvents from './tree/services/useNodeTreeEvents';

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
