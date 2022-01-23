import React from 'react';

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

export default function MicronToolbar() {
  return (
    <Box className="Toolbar">
      <IconButton className="Item">
        <AddRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={console.log}>
        <EditRounded fontSize="small" />
      </IconButton>
      <IconButton className="Item" onClick={console.log}>
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

// MicronToolbar.defaultProps = {
//   MicronShowToolbarProp: null,
// };
//
// MicronToolbar.propTypes = {
//   MicronShowToolbarProp: PropTypes.string,
// };
