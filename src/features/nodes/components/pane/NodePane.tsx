import NodePaneContent from './NodePaneContent';
import { selectSelected } from '../../nodes.selectors';
import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

interface NodePaneProps {
    page?: 'nodes' | 'workflow';
}

export default function NodePane({ page }: NodePaneProps) {
    const pk = useSelector(selectSelected);

    if (!pk) {
        return (
            <Box
                m={3}
                height={1}
                width={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Typography variant="h6" color="text.secondary" textAlign="center">
                    Select a node to view its details.
                </Typography>
                <Typography variant="h5" color="text.secondary" textAlign="center" mt={1}>
          ¯\_(ツ)_/¯
                </Typography>
            </Box>
        );
    }

    return <NodePaneContent page={page} selected={pk} />;
}
