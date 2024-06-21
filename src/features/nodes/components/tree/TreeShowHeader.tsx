import TreeBreadcrumbs from './TreeBreadcrumbs';
import useIsMobile from '../../../app/hooks/useIsMobile';
import { selectSelected } from '../../nodes.selectors';
import { Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function TreeShowHeader() {
    const selected = useSelector(selectSelected);
    const isMobile = useIsMobile();

    if (isMobile || !selected) {
        return null;
    }

    return (
        <Box sx={{
            width: 1,
            overflowX: 'auto',
            '::-webkit-scrollbar': { height: 6 },
            '::-webkit-scrollbar-thumb': {
                borderRadius: 2,
                maxWidth: '42px',
            },
        }}
        >
            <TreeBreadcrumbs />
        </Box>
    );
}
