import React from 'react';
import { faPenToSquare, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* mui */
import {
  IconButton,
  Box, Button, Tooltip,
} from '@mui/material';

export default function FlowStepToolbar() {
  return (
    <Box
      display="flex"
      sx={{
        ml: 0.5,
        '.Item': {
          width: 28,
          height: 28,
          mx: 0.5,
          borderRadius: 1,
          '&:hover': { backgroundColor: 'toolbar.hover' },
        },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 14 },
      }}
    >
      <Tooltip title="Add Node" placement="top">
        <IconButton className="Item" aria-label="Add Node" sx={{ color: 'toolbar.red' }}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Flow" placement="top">
        <IconButton className="Item" aria-label="Edit Node" sx={{ color: 'toolbar.green' }}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Flow" placement="top">
        <IconButton className="Item" aria-label="Edit Node" sx={{ color: 'toolbar.blue' }}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

FlowStepToolbar.propTypes = {};
