import useModalOpen from '../../../../../../common/hooks/useModalOpen';
import FlowStepModal from '../../../../../flow-steps/components/FlowStepModal';
import useFlowActions from '../../../../../flows/hooks/useFlowActions';
import useFlowStepContext from '../../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { faRotateLeft } from '@fortawesome/pro-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Chip, IconButton, Tooltip,
} from '@mui/material';
import React from 'react';

export default function FlowInnerToolbar() {
    const { isFlowDeleted, isFlowDeletedConflict } = useWorkflowBranch();
    const { isSelected, id: flowId } = useFlowContext();
    const { isSelected: isFlowStepSelected, isCreated: isFlowStepCreated } = useFlowStepContext();
    const [modalOpen, openModal, closeModal] = useModalOpen();
    const {
        openTitleEdit, restoreFlow, undoDeleteFlow, 
    } = useFlowActions();
    const isFlowDelConflict = isFlowDeletedConflict(flowId);
    const { deleteFlowCb } = useFlowActions();

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
                                            className="ToolbarChip"
                                            size="small"
                                            label="Conflict"
                                            sx={{ color: 'toolbar.red' }}
                                        />
                                    </Tooltip>
                                    <Tooltip title="Restore Flow." placement="top">
                                        <IconButton
                                            className="Item"
                                            aria-label="Restore Flow"
                                            sx={{ color: 'toolbar.lightRed' }}
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
                                                className="Item"
                                                aria-label="Edit Flow Title"
                                                sx={{ color: 'toolbar.default' }}
                                                onClick={openTitleEdit}
                                            >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Complete Flow" placement="top">
                                            <IconButton
                                                className="Item"
                                                aria-label="Delete Flow"
                                                sx={{ color: 'toolbar.default' }}
                                                onClick={deleteFlowCb}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )
                            }
                            {
                                isFlowDeleted(flowId) && (
                                    <Box display="flex" alignItems="center">
                                        <Tooltip title="Undo Delete" placement="top">
                                            <IconButton
                                                className="Item"
                                                aria-label="Undo Delete"
                                                sx={{ color: 'toolbar.purple' }}
                                                onClick={undoDeleteFlow}
                                            >
                                                <FontAwesomeIcon icon={faRotateLeft} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )
                            }
                            {!isFlowStepCreated
                                && (
                                    <div>
                                        <Tooltip title="Flow Step Nodes" placement="top">
                                            <IconButton
                                                className="Item"
                                                aria-label="Add Node"
                                                sx={{
                                                    color: 'toolbar.default',
                                                    borderRadius: '50%',
                                                }}
                                                onClick={openModal}
                                            >
                                                <FontAwesomeIcon icon={faEllipsisVertical} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )
                            }
                        </Box>
                    </Box>
                )
            }

            <FlowStepModal open={modalOpen} onClose={closeModal} />
        </>
    );
}
