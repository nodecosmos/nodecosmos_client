import useNodeCommands from '../../../hooks/tree/node/useNodeCommands';
import { faRotateLeft, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Tooltip, ButtonBase, Chip,
} from '@mui/material';
import React from 'react';

export default function ConflictToolbar() {
    const { addNode, removeNode } = useNodeCommands();

    return (
        <div className="NodeToolbar">
            <Tooltip
                title="Node deleted on main branch. You can either delete it from CR or restore it."
                placement="top">
                <Chip
                    size="small"
                    label="Conflict!"
                    sx={{
                        border: '1px solid',
                        color: 'toolbar.lightRed',
                        width: 'fit-content',
                        mr: 1,
                    }}
                />
            </Tooltip>
            <Tooltip title="Delete Node" placement="top">
                <ButtonBase
                    className="Item"
                    onClick={removeNode}
                    aria-label="Delete Node">
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonBase>
            </Tooltip>
            <Tooltip title="Restore Node" placement="top">
                <ButtonBase className="Item" onClick={addNode} aria-label="Add Node">
                    <FontAwesomeIcon icon={faRotateLeft} />
                </ButtonBase>
            </Tooltip>

        </div>
    );
}
