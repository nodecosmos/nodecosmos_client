import useNodeActions from '../../../../hooks/tree/node/useNodeActions';
import useNodeContext from '../../../../hooks/tree/node/useNodeContext';
import { faRotateLeft, faTrash } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Tooltip, ButtonBase, Chip,
} from '@mui/material';
import React from 'react';

export default function ConflictToolbar() {
    const { deleteNode, restoreNode } = useNodeActions();
    const {
        isExpanded,
        isSelected,
    } = useNodeContext();
    const showToolbar = isExpanded && isSelected;

    return (
        <div className="NodeToolbar">
            <Tooltip
                title="Node deleted on root. You can delete it from Contribution Request,
                       restore it, or move created node to another place."
                placement="top">
                <Chip
                    className="ToolbarChip"
                    size="small"
                    label="Conflict"
                />
            </Tooltip>
            {showToolbar && (
                <>
                    <Tooltip title="Delete Node and it's descendants" placement="top">
                        <ButtonBase
                            className="Item"
                            onClick={deleteNode}
                            aria-label="Delete Node">
                            <FontAwesomeIcon icon={faTrash} />
                        </ButtonBase>
                    </Tooltip>
                    <Tooltip title="Restore Node in Contribution Request" placement="top">
                        <ButtonBase className="Item" onClick={restoreNode} aria-label="Add Node">
                            <FontAwesomeIcon icon={faRotateLeft} />
                        </ButtonBase>
                    </Tooltip>
                </>
            )}
        </div>
    );
}
