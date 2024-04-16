import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import { NodecosmosDispatch } from '../../../../../store';
import { ObjectType } from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import useFlowStepActions from '../../../../flow-steps/hooks/useFlowStepActions';
import { FLOW_TOOLBAR_HEIGHT } from '../../../constants';
import useFlowStepColors from '../../../hooks/diagram/flow-step/useFlowStepColors';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../hooks/useWorkflowBranch';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { faTrashXmark } from '@fortawesome/pro-light-svg-icons';
import {
    faEllipsisVertical, faPlay, faSave,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Chip,
    IconButton,
    Tooltip, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function FlowStepToolbar() {
    const { branchId } = useWorkflowContext();
    const { isFlowStepInConflict } = useWorkflowBranch();
    const {
        title: flowTitle, id: flowId, flowSelected, nodeId,
    } = useFlowContext();
    const { flowStepPrimaryKey, isSelected: isFlowStepSelected } = useFlowStepContext();
    const { backgroundColor, color } = useFlowStepColors();
    const { currentRootId } = useBranchParams();

    const dispatch: NodecosmosDispatch = useDispatch();

    const handleFlowClick = useCallback(() => {
        dispatch(selectObject({
            currentBranchId: branchId,
            currentRootId,
            objectNodeId: nodeId,
            branchId,
            objectId: flowId,
            objectType: ObjectType.Flow,
        }));
    }, [branchId, currentRootId, dispatch, flowId, nodeId]);

    const [modalOpen, openModal, closeModal] = useModalOpen();

    const {
        createLoading, createNextFlowStep, keepFlowStep, deleteFlowStep,
    } = useFlowStepActions();

    const isInConflict = flowStepPrimaryKey?.id && isFlowStepInConflict(flowStepPrimaryKey.id);

    return (
        <Box
            pl={2}
            style={{ backgroundColor }}
            display="flex"
            alignItems="center"
            width={1}
            height={FLOW_TOOLBAR_HEIGHT}>
            <Typography
                onClick={handleFlowClick}
                variant="body1"
                fontWeight={600}
                color="text.tertiary"
                sx={{
                    minWidth: 'fit-content(14px)',
                    maxWidth: 220,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', // otherwise safari will break words into multiple lines
                    color,
                    '&:hover': {
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: 'text.link',
                    },
                }}
            >
                {flowTitle}
            </Typography>
            <ToolsContainer>
                {
                    (flowSelected || isFlowStepSelected) && (
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
                    )
                }
                {
                    (flowSelected || isFlowStepSelected) && (
                        <Box display="flex" justifyContent="end" width="100%" pr={1}>
                            {isInConflict
                                && (
                                    <div>
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
                                    </div>
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
