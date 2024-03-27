import { faPenToSquare, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import React from 'react';

export default function WorkflowToolbarTools() {
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
            <Tooltip title="Edit Io Title" placement="top">
                <IconButton
                    className="Item"
                    aria-label="Edit Io Title"
                    sx={{ svg: { color: 'toolbar.green' } }}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Io" placement="top">
                <IconButton
                    className="Item"
                    aria-label="Delete Flow"
                    sx={{ svg: { color: 'toolbar.blue' } }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
