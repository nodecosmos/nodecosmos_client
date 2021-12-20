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
  EditOutlined,
  Favorite,
  FavoriteBorder,
  SearchRounded,
  DeleteOutlineRounded,
} from '@mui/icons-material';
import colors from '../../../themes/dark/theme';

export default function MicronShowToolbar() {
  const iconSX = { fontSize: 14 };

  return (
    <Box>
      <IconButton
        sx={{ mr: 1, p: 2 }}
        aria-haspopup="true"
        disableRipple
        size="small"
      >
        <AddRounded fontSize="small" sx={iconSX} />
      </IconButton>
      <IconButton disableRipple aria-label="delete" size="small" sx={{ mr: 1, p: 2 }}>
        <EditOutlined fontSize="small" sx={iconSX} />
      </IconButton>
      <IconButton disableRipple aria-label="delete" size="small" sx={{ mr: 1, p: 2 }}>
        <DeleteOutlineRounded fontSize="small" sx={iconSX} />
      </IconButton>
      <IconButton disableRipple aria-label="delete" size="small" sx={{ mr: 1, p: 2 }}>
        <SearchRounded fontSize="small" sx={iconSX} />
      </IconButton>
      <Checkbox
        disableRipple
        sx={{ mr: 1, p: 2 }}
        icon={<FavoriteBorder fontSize="small" sx={iconSX} />}
        checkedIcon={<Favorite fontSize="small" sx={iconSX} />}
      />
      <Checkbox
        disableRipple
        sx={{ mr: 1, p: 2 }}
        icon={<BookmarkBorder fontSize="small" sx={iconSX} />}
        checkedIcon={<Bookmark fontSize="small" sx={iconSX} />}
      />
    </Box>
  );
}

// MicronShowToolbar.defaultProps = {
//   MicronShowToolbarProp: null,
// };
//
// MicronShowToolbar.propTypes = {
//   MicronShowToolbarProp: PropTypes.string,
// };
