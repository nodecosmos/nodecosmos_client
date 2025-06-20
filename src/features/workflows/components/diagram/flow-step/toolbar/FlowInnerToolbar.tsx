import ConfirmationModal, { ConfirmType } from '../../../../../../common/components/ConfirmationModal';
import useModalOpenAuthorized from '../../../../../../common/hooks/useModalOpenAuthorized';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import FlowStepModal from '../../../../../flow-steps/components/FlowStepModal';
import useFlowActions from '../../../../../flows/hooks/useFlowActions';
import useFlowStepContext from '../../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { faRotateLeft, faCodePullRequestDraft } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Chip, IconButton, Tooltip,
} from '@mui/material';
import React, { useCallback } from 'react';

export default function FlowInnerToolbar() {
    const {
        isFlowDeleted, isFlowDeletedConflict, isFlowCreated,
    } = useWorkflowBranch();
    const { isSelected, id: flowId } = useFlowContext();
    const { isSelected: isFlowStepSelected, isCreated: isFlowStepCreated } = useFlowStepContext();
    const [modalOpen, openModal, closeModal] = useModalOpenAuthorized();
    const {
        openTitleEdit, restoreFlow, undoDeleteFlow,
    } = useFlowActions();
    const isFlowDelConflict = isFlowDeletedConflict(flowId);
    const { deleteFlowCb } = useFlowActions();
    const [delModOpen, openDelMod, closeDelMod] = useModalOpenAuthorized();
    const handleDelete = useCallback(async () => {
        await deleteFlowCb();
        closeDelMod();
    }, [closeDelMod, deleteFlowCb]);
    const { isBranch } = useBranchContext();

    return (
        <>
            {
                (isSelected || (!isFlowStepCreated && isFlowStepSelected)) && (
                    <Box
                        display="flex"
                        alignItems="center"
                        width="100%"
                    >
                        {isFlowDelConflict
                            && (
                                <>
                                    <Tooltip
                                        title="Flow deleted from original branch. You can restore or delete it."
                                        placement="top">
                                        <Chip
                                            className="ToolbarChip toolbar-red"
                                            size="small"
                                            label="Conflict"
                                        />
                                    </Tooltip>
                                    <Tooltip title="Restore Flow." placement="top">
                                        <IconButton
                                            className="Item lightRed"
                                            aria-label="Restore Flow"
                                            onClick={restoreFlow}
                                        >
                                            <FontAwesomeIcon icon={faRotateLeft} />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )
                        }
                        <Box width={1} display="flex" alignItems="center" justifyContent="space-between">
                            {
                                !isFlowDeleted(flowId) && (
                                    <Box display="flex" alignItems="center">
                                        <Tooltip title="Edit Flow Title" placement="top">
                                            <IconButton
                                                className="Item toolbar-default"
                                                aria-label="Edit Flow Title"
                                                onClick={openTitleEdit}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Complete Flow" placement="top">
                                            <IconButton
                                                className="Item toolbar-default"
                                                aria-label="Delete Flow"
                                                onClick={openDelMod}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )
                            }
                            {
                                isFlowDeleted(flowId) && (
                                    <Tooltip title="Undo Delete" placement="top">
                                        <IconButton
                                            className="Item toolbar-purple"
                                            aria-label="Undo Delete"
                                            onClick={undoDeleteFlow}
                                        >
                                            <FontAwesomeIcon icon={faRotateLeft} />
                                        </IconButton>
                                    </Tooltip>
                                )
                            }
                            {!isFlowStepCreated
                                && (
                                    <div>
                                        <Tooltip title="Flow Step Nodes" placement="top">
                                            <IconButton
                                                className="Item toolbar-default"
                                                aria-label="Flow Step Nodes"
                                                onClick={openModal}
                                            >
                                                <FontAwesomeIcon icon={faCodePullRequestDraft} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )
                            }
                        </Box>
                    </Box>
                )
            }

            <ConfirmationModal
                text={
                    isBranch && !isFlowCreated(flowId)
                        ? `This action will mark flow for deletion within the contribution request. 
                           Actual deletion will occur once the contribution is merged.`
                        : 'This action will delete the complete flow and all of its steps.'
                }
                confirmText={isBranch && !isFlowCreated(flowId) ? 'Mark as deleted' : 'I understand, delete this flow '}
                confirmType={ConfirmType.Deletion}
                open={delModOpen}
                onClose={closeDelMod}
                onConfirm={handleDelete}
            />
            <FlowStepModal open={modalOpen} onClose={closeModal} />
        </>
    );
}
