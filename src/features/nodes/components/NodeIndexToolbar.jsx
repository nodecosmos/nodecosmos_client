import React from 'react';
/* mui */
import { Box, IconButton } from '@mui/material';
import {
  AddRounded,
  SearchRounded,
  Settings,
} from '@mui/icons-material';
/* nodecosmos */
import CreateNodeModal from './CreateNodeModal';

export default function NodeIndexToolbar() {
  const [openCreateNodeDialog, setOpenCreateNodeDialog] = React.useState(false);

  return (
    <>
      <CreateNodeModal
        open={openCreateNodeDialog}
        onClose={() => setOpenCreateNodeDialog(false)}
      />
      <Box className="Toolbar">
        <IconButton className="Item" disableRipple color="primary" onClick={() => setOpenCreateNodeDialog(true)}>
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
