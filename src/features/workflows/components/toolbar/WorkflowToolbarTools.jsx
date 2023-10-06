import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/pro-regular-svg-icons';

export default function WorkflowToolbarTools({ workflowId }) {
  return (
    <Box
      display="flex"
      sx={{
        ml: 1,
        '.Item': {
          width: 31,
          height: 1,
          mx: 0.25,
          borderRadius: 1,
          '&:hover': { backgroundColor: 'toolbar.hover' },
        },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
      }}
    >
      <Tooltip title="Edit IO Title" placement="top">
        <IconButton
          className="Item"
          aria-label="Edit IO Title"
          sx={{ svg: { color: 'toolbar.green' } }}
          onClick={() => setOpenEditIO(true)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete IO" placement="top">
        <IconButton
          className="Item"
          aria-label="Delete Flow"
          sx={{ svg: { color: 'toolbar.blue' } }}
          onClick={handleDeleteIO}
        >
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
