import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Box, IconButton } from '@mui/material';
import {
  AddRounded,
  SearchRounded,
  Settings,
} from '@mui/icons-material';
/* micro */
import CreateMicron from '../shared/CreateMicronModal';

export default function MicronIndexToolbar({ currentMicron }) {
  const [openCreateMicronDialog, setOpenCreateMicronDialog] = React.useState(false);

  return (
    <>
      <CreateMicron
        currentMicron={currentMicron}
        open={openCreateMicronDialog}
        onClose={() => setOpenCreateMicronDialog(false)}
      />
      <Box className="Toolbar">
        <IconButton className="Item" disableRipple color="primary" onClick={() => setOpenCreateMicronDialog(true)}>
          <AddRounded fontSize="small" />
        </IconButton>
        <IconButton className="Item" color="primary" disableRipple>
          <SearchRounded />
        </IconButton>
        <IconButton className="Item" disableRipple>
          <Settings fontSize="small" />
        </IconButton>
      </Box>
    </>
  );
}

MicronIndexToolbar.defaultProps = {
  currentMicron: null,
};

MicronIndexToolbar.propTypes = {
  currentMicron: PropTypes.object,
};
