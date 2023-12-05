import useNodeCommands from '../../hooks/tree/useNodeCommands';
import useNodeContext from '../../hooks/tree/useNodeContext';
import { NODE_BUTTON_HEIGHT } from '../../nodes.constants';
import { selectNodeAttribute } from '../../nodes.selectors';
import LikeButton from '../LikeButton';
import {
    faArrowUpRightFromSquare, faPenToSquare, faTrash,
} from '@fortawesome/pro-regular-svg-icons';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, IconButton, Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useSelector } from 'react-redux';

export default function NodeToolbar() {
    const {
        treeBranchId, branchId, id, isCreationInProgress,
    } = useNodeContext();
    const {
        addNode, editNode, removeNode,
    } = useNodeCommands();
    const likesCount = useSelector(selectNodeAttribute(treeBranchId, id, 'likesCount'));

    if (isCreationInProgress) {
        return (
            <Box display="flex" alignItems="center" height={NODE_BUTTON_HEIGHT}>
                <CircularProgress size={20} sx={{ color: 'secondary.main' }} />
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            sx={{
                '.Item': {
                    width: 31,
                    height: 1,
                    mx: 0.5,
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'toolbar.hover' },
                },
                '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
            }}
        >
            <Tooltip title="Add Node" placement="top">
                <IconButton className="Item" onClick={addNode} aria-label="Add Node" sx={{ color: 'toolbar.red' }}>
                    <FontAwesomeIcon icon={faPlus} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit Node" placement="top">
                <IconButton className="Item" onClick={editNode} aria-label="Edit Node" sx={{ color: 'toolbar.green' }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete Node" placement="top">
                <IconButton
                    className="Item"
                    onClick={removeNode}
                    aria-label="Delete Node"
                    sx={{ color: 'toolbar.blue' }}>
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Tooltip>

            <LikeButton id={id} branchId={branchId} treeBranchId={treeBranchId} likesCount={likesCount} />

            <Tooltip title="Open Node In New Tab" placement="top">
                <IconButton
                    target="_blank"
                    href={`/nodes/${id}`}
                    className="Item"
                    aria-label="Open Node in New Tab"
                    sx={{ color: 'toolbar.default' }}
                >
                    <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
