import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import { NodecosmosDispatch } from '../../../../../store';
import {
    NodecosmosError, ObjectType, Strict,
} from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import { keepFlowStep } from '../../../../branch/branches.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import { createFlowStep, deleteFlowStep } from '../../../../flow-steps/flowSteps.thunks';
import { FlowStepCreationParams } from '../../../../flow-steps/flowSteps.types';
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
    const { branchId, rootId } = useWorkflowContext();
    const { isFlowStepInConflict } = useWorkflowBranch();
    const {
        title: flowTitle, id: flowId, flowSelected, nodeId,
    } = useFlowContext();
    const {
        flowStepPrimaryKey, stepId, flowIndex, nextFlowIndex,
    } = useFlowStepContext();
    const { backgroundColor, color } = useFlowStepColors();
    const { currentRootId } = useBranchParams();

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();

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

    const handleFlowStepDeletion = useCallback(() => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }
        dispatch(deleteFlowStep({
            ...flowStepPrimaryKey,
            rootId,
        }));
    }, [dispatch, flowStepPrimaryKey, rootId]);

    const [createLoading, setCreateIsLoading, setCreateIsNotLoading] = useBooleanStateValue();

    const createNextFlowStep = useCallback(async () => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        let newFlowIndex;

        if (nextFlowIndex) {
            newFlowIndex = (flowIndex + nextFlowIndex) / 2;
        } else {
            newFlowIndex = flowIndex + 1;
        }

        const insertPayload: Strict<FlowStepCreationParams> = {
            nodeId: flowStepPrimaryKey.nodeId,
            branchId: flowStepPrimaryKey.branchId,
            flowId: flowStepPrimaryKey.flowId,
            flowIndex: newFlowIndex,
            rootId,
            nodeIds: [],
        };

        try {
            setCreateIsLoading();
            const response = await dispatch(createFlowStep(insertPayload));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                handleServerError(error);
                console.error(error);

                return;
            }
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setCreateIsNotLoading();
        }
    }, [
        dispatch, flowIndex, flowStepPrimaryKey, handleServerError, nextFlowIndex,
        rootId, setCreateIsLoading, setCreateIsNotLoading,
    ]);

    const keepFlowStepCb = useCallback(() => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        dispatch(keepFlowStep({
            branchId: flowStepPrimaryKey.branchId,
            objectId: flowStepPrimaryKey.id,
        }));
    }, [dispatch, flowStepPrimaryKey]);

    const [modalOpen, openModal, closeModal] = useModalOpen();

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
            {
                flowSelected && (
                    <ToolsContainer>
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
                        {
                            stepId && (
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
                                                    onClick={keepFlowStepCb}
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
                                            onClick={handleFlowStepDeletion}
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
                )
            }
            <FlowStepModal open={modalOpen} onClose={closeModal} />
        </Box>
    );
}
