import useBranchContext from '../../../branch/hooks/useBranchContext';
import { Box } from '@mui/material';
import React from 'react';

export default function CrTooltip() {
    const { title } = useBranchContext();

    return (
        <Box sx={{
            backgroundColor: 'background.1',
            p: 1,
            fontSize: 14,
            ml: -0,
            borderRadius: 1,
            color: 'text.secondary',
        }}>
            This node is not part of the main project tree. It belongs to Contribution Request:
            <br />
            <b># {title}</b>
        </Box>
    );
}
