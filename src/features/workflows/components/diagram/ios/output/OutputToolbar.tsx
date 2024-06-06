import ConfirmationModal, { ConfirmType } from '../../../../../../common/components/ConfirmationModal';
import ToolsContainer from '../../../../../../common/components/tools/ToolsContainer';
import useModalOpenAuthorized from '../../../../../../common/hooks/useModalOpenAuthorized';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import { TRANSITION_ANIMATION_DURATION } from '../../../../../nodes/nodes.constants';
import {
    NODE_BUTTON_HEIGHT, OUTPUT_BUTTON_SKEWED_WIDTH, OUTPUT_BUTTON_X_MARGIN,
} from '../../../../constants';
import useIoActions from '../../../../hooks/diagram/io/useIoActions';
import useIoContext from '../../../../hooks/diagram/io/useIoContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import ObjectCommentsBadge from '../../ObjectCommentBadge';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { faRotateLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';

export default function OutputToolbar() {
    const { isIoCreated } = useWorkflowBranch();
    const {
        isSelected, x, y, id,
    } = useIoContext();
    const {
        openTitleEdit, deleteIoCb, undoDeleteIo,
    } = useIoActions();
    const { isIoDeleted } = useWorkflowBranch();
    const [delModOpen, openDelMod, closeDelMod] = useModalOpenAuthorized();
    const handleDelete = useCallback(async () => {
        await deleteIoCb();
        closeDelMod();
    }, [closeDelMod, deleteIoCb]);
    const { isBranch } = useBranchContext();

    if (!isSelected) {
        return (
            <foreignObject
                width={OUTPUT_BUTTON_SKEWED_WIDTH}
                height={NODE_BUTTON_HEIGHT}
                x={x + OUTPUT_BUTTON_X_MARGIN}
                y={y - 45}
                style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
            >
                {isBranch && <ObjectCommentsBadge id={id} justifyContent="end" mt={-0.5} />}
            </foreignObject>
        );
    }

    return (
        <foreignObject
            width={OUTPUT_BUTTON_SKEWED_WIDTH}
            height={NODE_BUTTON_HEIGHT}
            x={x + OUTPUT_BUTTON_X_MARGIN}
            y={y - 47.5}
            style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
        >
            {
                !isIoDeleted(id) && (
                    <ToolsContainer justifyContent="end">
                        <Tooltip title="Edit IO Title" placement="top">
                            <IconButton
                                className="Item"
                                aria-label="Edit IO Title"
                                sx={{
                                    color: 'toolbar.green',
                                    fontSize: 14,
                                }}
                                onClick={openTitleEdit}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete IO" placement="top">
                            <IconButton
                                className="Item"
                                aria-label="Delete IO"
                                sx={{
                                    color: 'toolbar.lightRed',
                                    fontSize: 14,
                                    ml: 1,
                                }}
                                onClick={openDelMod}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </IconButton>
                        </Tooltip>
                        {isBranch && <ObjectCommentsBadge mt={-0.25} mr={1} id={id} />}
                    </ToolsContainer>
                )
            }
            {
                isIoDeleted(id) && (
                    <ToolsContainer justifyContent="end">
                        {isBranch && <ObjectCommentsBadge id={id} />}
                        <Tooltip title="Undo Delete" placement="top">
                            <IconButton
                                className="Item"
                                aria-label="Undo Delete"
                                sx={{ color: 'toolbar.purple' }}
                                onClick={undoDeleteIo}
                            >
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </IconButton>
                        </Tooltip>
                        {isBranch && <ObjectCommentsBadge mt={-0.25} mr={1} id={id} />}
                    </ToolsContainer>
                )
            }
            <ConfirmationModal
                text={
                    isBranch && !isIoCreated(id)
                        ? `This action will mark output for deletion within the contribution request. 
                           Actual deletion will occur once the contribution is merged.`
                        : 'This action will delete output and dissociate it from flow step nodes that are using it.'
                }
                confirmText={isBranch && !isIoCreated(id) ? 'Mark as deleted' : 'Delete'}
                confirmType={ConfirmType.Deletion}
                open={delModOpen}
                onClose={closeDelMod}
                onConfirm={handleDelete}
            />
        </foreignObject>
    );
}
