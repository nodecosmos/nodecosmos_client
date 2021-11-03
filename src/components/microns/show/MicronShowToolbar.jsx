import React from 'react';
// import * as PropTypes from 'prop-types';
/* mui */
import {
  // Typography,
  // Grid,
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
} from '@mui/icons-material';
import { blue1, fluorescent, yellow } from '../../../themes/dark/colors';

export default function MicronShowToolbar() {
  const iconSX = { fontSize: '1rem' };

  return (
    <Box>
      <IconButton
        sx={{ mr: 1, p: 2 }}
        aria-haspopup="true"
        disableRipple
        size="small"
      >
        <AddRounded htmlColor={fluorescent} fontSize="small" sx={iconSX} />
      </IconButton>
      <IconButton disableRipple aria-label="delete" size="small" sx={{ mr: 1, p: 2 }}>
        <EditOutlined htmlColor={blue1} fontSize="small" sx={iconSX} />
      </IconButton>
      <IconButton disableRipple aria-label="delete" size="small" sx={{ mr: 1, p: 2 }}>
        <SearchRounded htmlColor={yellow} fontSize="small" sx={iconSX} />
      </IconButton>
      <Checkbox
        disableRipple
        sx={{ mr: 1, p: 2 }}
        icon={<FavoriteBorder color="secondary" fontSize="small" sx={iconSX} />}
        checkedIcon={<Favorite color="secondary" fontSize="small" sx={iconSX} />}
      />
      <Checkbox
        disableRipple
        sx={{ mr: 1, p: 2 }}
        icon={<BookmarkBorder htmlColor={fluorescent} fontSize="small" sx={iconSX} />}
        checkedIcon={<Bookmark htmlColor={fluorescent} fontSize="small" sx={iconSX} />}
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
