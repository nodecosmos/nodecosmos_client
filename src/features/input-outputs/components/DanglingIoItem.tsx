import { NodecosmosDispatch } from '../../../store';
import { deleteIo } from '../inputOutputs.thunks';
import { InputOutput } from '../inputOutputs.types';
import { faCodeCommit } from '@fortawesome/pro-light-svg-icons';
import { faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    io: InputOutput;
}

function DanglingIoItem(props: Props) {
    const { io } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleDelete = useCallback(() => {
        dispatch(deleteIo({
            rootId: io.rootId,
            nodeId: io.nodeId,
            branchId: io.branchId,
            id: io.id,
            deleteDangling: true,
        }));
    }, [dispatch, io.branchId, io.id, io.nodeId, io.rootId]);

    return (
        <Box
            key={io.id}
            component="li"
            display="flex"
            alignItems="center"
            zIndex={1}
            position="relative"
            mt={2}
            px={1}
            py={2}
            sx={{
                cursor: 'pointer',
                borderBottom: 1,
                borderColor: 'borders.4',
                '&:hover': { borderColor: 'borders.4' },
            }}
        >
            <FontAwesomeIcon size="lg" icon={faCodeCommit} />
            <Box ml={2}>
                <Typography variant="body2" color="text.primary" fontWeight="bold">
                    {io.title}
                </Typography>
            </Box>

            <IconButton
                size="small"
                color="secondary"
                onClick={handleDelete}
                sx={{
                    color: 'error.main',
                    cursor: 'pointer',
                    ml: 1,
                }}
            >
                <FontAwesomeIcon size="sm" icon={faTrash} />
            </IconButton>
        </Box>
    );
}

export default React.memo(DanglingIoItem);
