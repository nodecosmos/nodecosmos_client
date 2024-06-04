import useBranchContext from '../../../branch/hooks/useBranchContext';
import { Box } from '@mui/material';
import React from 'react';

export default function CrTooltip() {
    const { title } = useBranchContext();

    return (
        <Box sx={{
            backgroundColor: 'background.1',
            m: -1,
            p: 1,
            fontSize: 14,
            ml: -8,
            borderRadius: 1,
            color: 'text.secondary',
        }}>
            Current Node is not part of the main project.
            It is part of the Contribution Request <b>{title}</b>.
        </Box>
    );
}
