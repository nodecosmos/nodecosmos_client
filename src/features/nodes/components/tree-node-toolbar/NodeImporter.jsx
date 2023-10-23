import React, { useState } from 'react';
import { faCodeBranch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Box } from '@mui/material';
import ImportNodeModal from '../importer/ImportNodeModal';

export default function NodeImporter() {
    const [open, setOpen] = useState(false);

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <IconButton
                className="Item"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Import Node"
                sx={{ color: 'toolbar.lightRed' }}
            >
                <FontAwesomeIcon icon={faCodeBranch} />
            </IconButton>

            {open && <ImportNodeModal open={open} onClose={() => setOpen(false)} />}
        </Box>
    );
}
