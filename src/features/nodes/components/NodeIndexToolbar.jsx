import React from 'react';
/* mui */
import { Box, Button } from '@mui/material';
import AddRounded from '@mui/icons-material/AddRounded';

import NodeIndexSearch from './NodeIndexSearch';
import CreateNodeModal from './CreateNodeModal';

export default function NodeIndexToolbar() {
  const [openCreateNodeDialog, setOpenCreateNodeDialog] = React.useState(false);

  return (
    <>
      <CreateNodeModal
        open={openCreateNodeDialog}
        onClose={() => setOpenCreateNodeDialog(false)}
      />
      <Box display="flex" alignItems="center">
        <Button
          size="small"
          color="button"
          sx={{ border: 1, borderColor: 'borders.4' }}
          variant="contained"
          disableElevation
          type="submit"
          startIcon={<AddRounded />}
          onClick={() => setOpenCreateNodeDialog(true)}
        >
          Add Node
        </Button>
        <NodeIndexSearch />
      </Box>
    </>
  );
}
