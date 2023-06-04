import React from 'react';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* mui */
import {
  IconButton,
  Box,
} from '@mui/material';

export default function WorkflowStepToolbar() {
  return (
    <Box
      display="flex"
      sx={{
        ml: 0.5,
        '.Item': {
          width: 32,
          height: 32,
          mx: 0.5,
          borderRadius: 1,
          '&:hover': { backgroundColor: 'toolbar.hover' },
        },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
      }}
    >
      <IconButton className="Item" aria-label="Add Flow" sx={{ color: 'toolbar.red' }}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    </Box>
  );
}

WorkflowStepToolbar.propTypes = {};
