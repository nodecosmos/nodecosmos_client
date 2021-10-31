import React from 'react';
import PropTypes from 'prop-types';
/* mui */
import {
  Grid,
  IconButton,
  Box,
  Checkbox,
} from '@mui/material';
import {
  EditOutlined as EditIcon,
  FavoriteBorder,
  Favorite,
  BookmarkBorder,
  Bookmark,
} from '@mui/icons-material';

export default function MainPage(props) {
  const { micron } = props;

  return (
    <Grid container spacing={3} p={2} justifyContent="center">
      <Grid item xs={12} align="center" justifyItems="center">
        <Box mt={2}>
          <IconButton aria-label="delete" size="small" sx={{ mr: 1, p: 2 }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <Checkbox
            sx={{ mr: 1, p: 2 }}
            icon={<FavoriteBorder color="secondary" fontSize="small" />}
            checkedIcon={<Favorite color="secondary" fontSize="small" />}
          />
          <Checkbox
            sx={{ mr: 1, p: 2 }}
            icon={<BookmarkBorder color="primary" fontSize="small" />}
            checkedIcon={<Bookmark fontSize="small" />}
          />
        </Box>
      </Grid>
      <Grid item xs={10}>
        {micron.description}
      </Grid>
    </Grid>
  );
}

MainPage.propTypes = {
  micron: PropTypes.object.isRequired,
};
