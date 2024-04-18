import FlowTitle from './toolbar/FlowTitle';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import useFlowStepActions from '../../../../flow-steps/hooks/useFlowStepActions';
import useFlowActions from '../../../../flows/hooks/useFlowActions';
import { FLOW_TOOLBAR_HEIGHT } from '../../../constants';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowColors from '../../../hooks/diagram/flows/useFlowColors';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../hooks/useWorkflowBranch';
import {
    faTrashXmark, faTrash, faPenToSquare,
} from '@fortawesome/pro-light-svg-icons';
import { faRotateLeft } from '@fortawesome/pro-regular-svg-icons';
import {
    faEllipsisVertical, faPlay, faSave,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export default function FlowStepToolbar() {
    const { isFlowDeletedConflict, isFlowStepInConflict } = useWorkflowBranch();
    const { flowSelected, id: flowId } = useFlowContext();
    const { flowStepPrimaryKey, isSelected: isFlowStepSelected } = useFlowStepContext();
    const [modalOpen, openModal, closeModal] = useModalOpen();
    const { openTitleEdit, restoreFlow } = useFlowActions();
    const {
        createLoading, createNextFlowStep, keepFlowStep, deleteFlowStep,
    } = useFlowStepActions();
    const { backgroundColor: flowBg, outlineColor: flowBorder } = useFlowColors();
    const isFlowDelConflict = isFlowDeletedConflict(flowId);
    const isFsInConflict = flowStepPrimaryKey?.id && isFlowStepInConflict(flowStepPrimaryKey.id);
    const { deleteFlowCb } = useFlowActions();

    return (
        <Box
            pl={2}
            display="flex"
            alignItems="center"
            width={1}
            height={FLOW_TOOLBAR_HEIGHT}
            style={{
                backgroundColor: flowBg,
                borderColor: flowBorder,
                border: 1,
            }}>
            <FlowTitle />
            <ToolsContainer>
                {
                    (flowSelected || isFlowStepSelected) && (
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                        >
                            {isFlowDelConflict
                                && (
                                    <>
                                        <Tooltip
                                            title="Flow deleted from original branch."
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
                            <Tooltip title="Delete Flow" placement="top">
                                <IconButton
                                    className="Item"
                                    aria-label="Delete Flow"
                                    sx={{ color: 'toolbar.default' }}
                                    onClick={deleteFlowCb}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </IconButton>
                            </Tooltip>
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
                        </Box>
                    )
                }
                {
                    (flowSelected || isFlowStepSelected) && (
                        <Box display="flex" alignItems="center" justifyContent="end" width="100%" pr={1}>
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
                                            className="Item"
                                            aria-label="Keep Flow Step"
                                            sx={{ color: 'toolbar.lightRed' }}
                                            onClick={keepFlowStep}
                                        >
                                            <FontAwesomeIcon icon={faSave} />
                                        </IconButton>
                                    </>
                                )
                            }
                            <Tooltip title="Delete Flow Step" placement="top">
                                <IconButton
                                    className="Item"
                                    aria-label="Delete Flow Step"
                                    sx={{ color: 'toolbar.red' }}
                                    onClick={deleteFlowStep}
                                >
                                    <FontAwesomeIcon icon={faTrashXmark} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add Next Flow Step" placement="top">
                                {
                                    createLoading
                                        ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} />
                                        : (
                                            <IconButton
                                                className="Item"
                                                aria-label="Add Next Flow Step"
                                                sx={{ color: 'toolbar.green' }}
                                                onClick={createNextFlowStep}>
                                                <FontAwesomeIcon
                                                    icon={faPlay} />
                                            </IconButton>
                                        )

                                }
                            </Tooltip>
                        </Box>
                    )
                }
            </ToolsContainer>
            <FlowStepModal open={modalOpen} onClose={closeModal} />
        </Box>
    );
}
