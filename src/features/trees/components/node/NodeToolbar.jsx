import React from 'react';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { faPenToSquare, faTrash, faArrowUpRightFromSquare } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/* mui */
import { IconButton, Box, Tooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LikeButton from '../../../nodes/components/tree-node-toolbar/LikeButton';
import NodeImporter from '../../../nodes/components/tree-node-toolbar/NodeImporter';

import { NODE_BUTTON_HEIGHT } from '../../trees.constants';
import useNodeContext from '../../hooks/node/useNodeContext';
import useNodeCommands from '../../hooks/node/useNodeCommands';

export default function NodeToolbar() {
    const { nodeId, isCreationInProgress } = useNodeContext();
    const { addNode, editNode, removeNode } = useNodeCommands();

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
                <IconButton className="Item" onClick={removeNode} aria-label="Delete Node" sx={{ color: 'toolbar.blue' }}>
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Tooltip>
            <LikeButton nodeId={nodeId} />
            <NodeImporter />

            <Tooltip title="Open Node In New Tab" placement="top">
                <IconButton
                    target="_blank"
                    href={`/nodes/${nodeId}`}
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
