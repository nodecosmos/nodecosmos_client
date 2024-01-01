import useNodeCommands from '../../../hooks/tree/node/useNodeCommands';
import useNodeContext from '../../../hooks/tree/node/useNodeContext';
import { NODE_BUTTON_HEIGHT } from '../../../nodes.constants';
import { selectNodeAttribute } from '../../../nodes.selectors';
import LikeButton from '../../LikeButton';
import {
    faArrowUpRightFromSquare, faPenToSquare, faTrash,
} from '@fortawesome/pro-regular-svg-icons';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Tooltip, ButtonBase,
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
                <CircularProgress size={20} />
            </Box>
        );
    }

    return (
        <div className="NodeToolbar">
            <Tooltip title="Add Node" placement="top">
                <ButtonBase className="Item" onClick={addNode} aria-label="Add Node">
                    <FontAwesomeIcon icon={faPlus} />
                </ButtonBase>
            </Tooltip>
            <Tooltip title="Edit Node" placement="top">
                <ButtonBase className="Item" onClick={editNode} aria-label="Edit Node">
                    <FontAwesomeIcon icon={faPenToSquare} />
                </ButtonBase>
            </Tooltip>
            <Tooltip title="Delete Node" placement="top">
                <ButtonBase
                    className="Item"
                    onClick={removeNode}
                    aria-label="Delete Node">
                    <FontAwesomeIcon icon={faTrash} />
                </ButtonBase>
            </Tooltip>

            <LikeButton
                id={id}
                branchId={branchId}
                treeBranchId={treeBranchId}
                likesCount={likesCount} />

            <Tooltip title="Open Node In New Tab" placement="top">
                <ButtonBase
                    target="_blank"
                    href={`/nodes/${id}`}
                    className="Item"
                    aria-label="Open Node in New Tab"
                >
                    <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                    />
                </ButtonBase>
            </Tooltip>
        </div>
    );
}
