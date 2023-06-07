import React from 'react';

/* mui */
import { Button } from '@mui/material';

export default function FlowStepToolbar() {
  return (
    <Button
      size="small"
      variant="outlined"
      color="secondary"
      disableElevation
      type="submit"
      sx={{ ml: 2, borderRadius: 1 }}
    >
      Add Flow
    </Button>
  );
}

FlowStepToolbar.propTypes = {};
