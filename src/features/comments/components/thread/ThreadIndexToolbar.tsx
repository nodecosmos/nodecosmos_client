import ThreadSearchInput from './ThreadSearchInput';
import { HEADER_HEIGHT } from '../../../app/constants';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@mui/material';
import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export default function ThreadsIndexToolbar() {
    const { branchId, nodeId } = useBranchContext();
    const to = useMemo(() => `/nodes/${branchId}/${nodeId}/threads/new`, [branchId, nodeId]);

    return (
        <>
            <Box
                height={HEADER_HEIGHT}
                width={1}
                display="flex"
                alignItems="center"
                position="relative"
                boxShadow="2"
                borderBottom={1}
                borderColor="borders.1"
                zIndex={3}
                pl={1.25}
            >
                <Button
                    variant="outlined"
                    component={RouterLink}
                    to={to}
                    color="primary"
                    startIcon={<FontAwesomeIcon icon={faAdd} />}
                    sx={{ mr: 1 }}>
                    New Thread
                </Button>

                <ThreadSearchInput />
            </Box>
        </>
    );
}
