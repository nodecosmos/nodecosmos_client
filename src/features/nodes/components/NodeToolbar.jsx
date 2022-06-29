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

export default function NodeToolbar(props) {
  const { addNode } = props;

  return (
    <Box className="Toolbar">
      <IconButton className="Item" onClick={addNode}>
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item">
        <EditRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item">
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

// NodeToolbar.defaultProps = {
//   NodeShowToolbarProp: null,
// };

NodeToolbar.propTypes = {
  addNode: PropTypes.func.isRequired,
};
