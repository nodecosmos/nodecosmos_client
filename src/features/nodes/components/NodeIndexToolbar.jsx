import React from 'react';
/* mui */
import { Box, Button } from '@mui/material';

import AddRounded from '@mui/icons-material/AddRounded';

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
        <Button
          size="small"
          color="primary"
          variant="contained"
          disableElevation
          type="submit"
          startIcon={<AddRounded />}
          onClick={() => setOpenCreateNodeDialog(true)}
        >
          Add Node
        </Button>
      </Box>
    </>
  );
}
