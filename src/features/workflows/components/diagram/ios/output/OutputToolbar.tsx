import ConfirmationModal, { ConfirmType } from '../../../../../../common/components/ConfirmationModal';
import ToolsContainer from '../../../../../../common/components/tools/ToolsContainer';
import useModalOpenAuthorized from '../../../../../../common/hooks/useModalOpenAuthorized';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import {
    selectMainObjectThreadByObjectId,
    selectThreadCommentsLength,
} from '../../../../../comments/comments.selectors';
import useIoActions from '../../../../hooks/diagram/io/useIoActions';
import useIoContext from '../../../../hooks/diagram/io/useIoContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import {
    NODE_HEIGHT, OUTPUT_BUTTON_SKEWED_WIDTH, OUTPUT_BUTTON_X_MARGIN,
} from '../../../../workflows.constants';
import ObjectCommentsBadge from '../../ObjectCommentBadge';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { faRotateLeft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function OutputToolbar() {
    const { isIoCreated } = useWorkflowBranch();
    const {
        isSelected, x, y, id,
    } = useIoContext();
    const {
        openTitleEdit, deleteIoCb, undoDeleteIo,
    } = useIoActions();
    const { branchId } = useBranchContext();
    const { isIoDeleted } = useWorkflowBranch();
    const [delModOpen, openDelMod, closeDelMod] = useModalOpenAuthorized();
    const handleDelete = useCallback(async () => {
        await deleteIoCb();
        closeDelMod();
    }, [closeDelMod, deleteIoCb]);
    const { isBranch } = useBranchContext();
    const threadId = useSelector(selectMainObjectThreadByObjectId(branchId, id));
    const length = useSelector(selectThreadCommentsLength(threadId));

    if (!isSelected && length) {
        return (
            <foreignObject
                width={OUTPUT_BUTTON_SKEWED_WIDTH}
                height={NODE_HEIGHT}
                x={x + OUTPUT_BUTTON_X_MARGIN - 8}
                y={y - 44.5}
            >
                {isBranch && <ObjectCommentsBadge id={id} justifyContent="end" mt={-0.5} />}
            </foreignObject>
        );
    }

    if (!isSelected) return null;

    return (
        <foreignObject
            width={OUTPUT_BUTTON_SKEWED_WIDTH}
            height={NODE_HEIGHT}
            x={x + OUTPUT_BUTTON_X_MARGIN}
            y={y - 47.5}
        >
            {
                !isIoDeleted(id) && (
                    <ToolsContainer justifyContent="end">
                        <Tooltip title="Edit IO Title" placement="top">
                            <IconButton
                                className="Item toolbar-green"
                                aria-label="Edit IO Title"
                                onClick={openTitleEdit}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete IO" placement="top">
                            <IconButton
                                className="Item toolbar-lightRed"
                                aria-label="Delete IO"
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
                        <Tooltip title="Undo Delete" placement="top">
                            <IconButton
                                className="Item toolbar-purple"
                                aria-label="Undo Delete"
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
