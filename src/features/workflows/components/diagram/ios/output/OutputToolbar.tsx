import ConfirmationModal, { ConfirmType } from '../../../../../../common/components/ConfirmationModal';
import ToolsContainer from '../../../../../../common/components/tools/ToolsContainer';
import useModalOpen from '../../../../../../common/hooks/useModalOpen';
import useBranchParams from '../../../../../branch/hooks/useBranchParams';
import { TRANSITION_ANIMATION_DURATION } from '../../../../../nodes/nodes.constants';
import {
    NODE_BUTTON_HEIGHT, OUTPUT_BUTTON_SKEWED_WIDTH, OUTPUT_BUTTON_X_MARGIN,
} from '../../../../constants';
import useIoActions from '../../../../hooks/diagram/io/useIoActions';
import useIoContext from '../../../../hooks/diagram/io/useIoContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
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
    const [delModOpen, openDelMod, closeDelMod] = useModalOpen();
    const handleDelete = useCallback(async () => {
        await deleteIoCb();
        closeDelMod();
    }, [closeDelMod, deleteIoCb]);
    const { isBranch } = useBranchParams();

    if (!isSelected) {
        return null;
    }

    return (
        <foreignObject
            width={OUTPUT_BUTTON_SKEWED_WIDTH}
            height={NODE_BUTTON_HEIGHT}
            x={x + OUTPUT_BUTTON_X_MARGIN}
            y={y - 50}
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
                    </ToolsContainer>
                )
            }
            {
                isIoDeleted(id) && (
                    <ToolsContainer justifyContent="end">
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
                onCancel={closeDelMod}
                onConfirm={handleDelete}
            />
        </foreignObject>
    );
}
