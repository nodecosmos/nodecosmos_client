import useFlowStepActions from '../../../../../flow-steps/hooks/useFlowStepActions';
import useFlowStepContext from '../../../../hooks/diagram/flow-step/useFlowStepContext';
import useWorkflowBranch from '../../../../hooks/useWorkflowBranch';
import { faTrashXmark } from '@fortawesome/pro-light-svg-icons';
import { faRotateLeft } from '@fortawesome/pro-regular-svg-icons';
import { faPlay, faSave } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Chip, IconButton, Tooltip,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

export default function FlowStepInnerToolbar() {
    const { isFlowStepInConflict, isFlowStepDeletedConflict } = useWorkflowBranch();
    const { flowStepPrimaryKey } = useFlowStepContext();
    const {
        createLoading, createNextFlowStep, keepFlowStep, deleteFlowStep, restoreFlowStep,
    } = useFlowStepActions();
    const isFsInConflict = flowStepPrimaryKey?.id && isFlowStepInConflict(flowStepPrimaryKey.id);
    const isFsDeletedConflict = flowStepPrimaryKey?.id && isFlowStepDeletedConflict(flowStepPrimaryKey.id);

    return (
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
            {isFsDeletedConflict
                && (
                    <>
                        <Tooltip
                            title="Step deleted from original branch. You can restore or delete it."
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
                                onClick={restoreFlowStep}
                            >
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </IconButton>
                        </Tooltip>
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
    );
}
