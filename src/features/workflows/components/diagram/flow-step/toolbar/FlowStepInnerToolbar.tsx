import ConfirmationModal, { ConfirmType } from '../../../../../../common/components/ConfirmationModal';
import useModalOpenAuthorized from '../../../../../../common/hooks/useModalOpenAuthorized';
import useBranchContext from '../../../../../branch/hooks/useBranchContext';
import FlowStepModal from '../../../../../flow-steps/components/FlowStepModal';
import useFlowStepActions from '../../../../../flow-steps/hooks/useFlowStepActions';
import useFlowStepContext from '../../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { faTrashXmark } from '@fortawesome/pro-light-svg-icons';
import { faRotateLeft, faCodePullRequestDraft } from '@fortawesome/pro-regular-svg-icons';
import { faPlay, faSave } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Chip, IconButton, Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback } from 'react';

export default function FlowStepInnerToolbar() {
    const {
        isFlowStepCreated, isFlowDeleted, isFlowStepDeleted, isFlowStepInConflict, isFlowStepDeletedConflict,
    } = useWorkflowBranch();
    const { flowStepPrimaryKey } = useFlowStepContext();
    const {
        createLoading, createNextFlowStep, keepFlowStep, deleteFlowStep, restoreFlowStep, undoDeleteFlowStep,
    } = useFlowStepActions();
    const isFsInConflict = flowStepPrimaryKey?.id && isFlowStepInConflict(flowStepPrimaryKey.id);
    const isFsDeletedConflict = flowStepPrimaryKey?.id && isFlowStepDeletedConflict(flowStepPrimaryKey.id);
    const { isSelected } = useFlowContext();
    const { isSelected: isFlowStepSelected } = useFlowStepContext();
    const [modalOpen, openModal, closeModal] = useModalOpenAuthorized();
    const [delModOpen, openDelMod, closeDelMod] = useModalOpenAuthorized();
    const handleDelete = useCallback(async () => {
        await deleteFlowStep();
        closeDelMod();
    }, [closeDelMod, deleteFlowStep]);
    const { isBranch } = useBranchContext();

    if (!flowStepPrimaryKey?.id || (!isSelected && !isFlowStepSelected)) {
        return null;
    }

    if (isFlowDeleted(flowStepPrimaryKey.flowId)) {
        return null;
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="end" width="100%">
            {isFsInConflict
                && (
                    <>
                        <Tooltip
                            title="FlowStep with same index already exists.
                                   You can choose to delete it from CR or keep it."
                            placement="top">
                            <Chip
                                className="ToolbarChip"
                                size="small"
                                label="Conflict"
                            />
                        </Tooltip>
                        <IconButton
                            className="Item toolbar-lightRed"
                            aria-label="Keep Flow Step"
                            onClick={keepFlowStep}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </IconButton>
                    </>
                )
            }
            {isFsDeletedConflict
                && (
                    <>
                        <Tooltip
                            title="Step deleted from original branch. You can restore or delete it."
                            placement="top">
                            <Chip
                                className="ToolbarChip toolbar-lightRed"
                                size="small"
                                label="Conflict"
                            />
                        </Tooltip>
                        <Tooltip title="Restore Flow Step" placement="top">
                            <IconButton
                                className="Item toolbar-lightRed"
                                aria-label="Restore Step"
                                onClick={restoreFlowStep}
                            >
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
            {
                !isFlowStepDeleted(flowStepPrimaryKey.id) && (
                    <>
                        <Tooltip title="Flow Step Nodes" placement="top">
                            <IconButton
                                className="Item toolbar-default"
                                aria-label="Add Node"
                                onClick={openModal}
                            >
                                <FontAwesomeIcon icon={faCodePullRequestDraft} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Flow Step" placement="top">
                            <IconButton
                                className="Item toolbar-red"
                                aria-label="Delete Flow Step"
                                onClick={openDelMod}
                            >
                                <FontAwesomeIcon icon={faTrashXmark} />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
            {
                isFlowStepDeleted(flowStepPrimaryKey.id) && (
                    <Box display="flex" alignItems="center">
                        <Tooltip title="Undo Delete" placement="top">
                            <IconButton
                                className="Item toolbar-purple"
                                aria-label="Undo Delete"
                                onClick={undoDeleteFlowStep}
                            >
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
            <Tooltip title="Add Next Flow Step" placement="top">
                {
                    createLoading
                        ? <CircularProgress size={20} />
                        : (
                            <IconButton
                                className="Item toolbar-green"
                                aria-label="Add Next Flow Step"
                                onClick={createNextFlowStep}>
                                <FontAwesomeIcon icon={faPlay} />
                            </IconButton>
                        )

                }
            </Tooltip>
            <ConfirmationModal
                text={
                    isBranch && !isFlowStepCreated(flowStepPrimaryKey.id)
                        ? `This action will mark step for deletion within the contribution request. 
                           Actual deletion will occur once the contribution is merged.`
                        : 'This action will delete the flow step and all of its outputs'
                }
                confirmText={isBranch && !isFlowStepCreated(flowStepPrimaryKey.id) ? 'Mark for deletion' : 'Delete'}
                confirmType={ConfirmType.Deletion}
                open={delModOpen}
                onClose={closeDelMod}
                onConfirm={handleDelete}
            />
            <FlowStepModal open={modalOpen} onClose={closeModal} />
        </Box>
    );
}
