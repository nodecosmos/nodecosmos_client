import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import { NodecosmosDispatch } from '../../../../../store';
import { Strict } from '../../../../../types';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import { createFlowStep, deleteFlowStep } from '../../../../flow-steps/flowSteps.thunks';
import { FlowStepCreationParams } from '../../../../flow-steps/flowSteps.types';
import { FLOW_STEP_SIZE } from '../../../constants';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { WorkflowDiagramObjectType } from '../../../workflow.types';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import { faDiagramProject, faTrash } from '@fortawesome/pro-light-svg-icons';
import { faPlay } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    IconButton,
    Tooltip, Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function FlowStepToolbar() {
    const { branchId } = useWorkflowContext();
    const {
        title: flowTitle, id: flowId, flowSelected,
    } = useFlowContext();
    const {
        flowStepPrimaryKey, stepId, nextFlowStepId,
    } = useFlowStepContext();

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();

    const handleFlowClick = useCallback(() => {
        dispatch(setSelectedWorkflowDiagramObject({
            branchId,
            id: flowId,
            type: WorkflowDiagramObjectType.Flow,
        }));
    }, [dispatch, flowId, branchId]);

    const handleFlowStepDeletion = useCallback(() => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }
        dispatch(deleteFlowStep(flowStepPrimaryKey));
    }, [dispatch, flowStepPrimaryKey]);

    const [createLoading, setCreateIsLoading, setCreateIsNotLoading] = useBooleanStateValue();

    const createNextFlowStep = useCallback(async () => {
        if (!flowStepPrimaryKey) {
            throw new Error('Flow Step Primary Key is not defined');
        }

        const insertPayload: Strict<FlowStepCreationParams> = {
            nodeId: flowStepPrimaryKey.nodeId,
            branchId: flowStepPrimaryKey.branchId,
            workflowId: flowStepPrimaryKey.workflowId,
            flowId: flowStepPrimaryKey.flowId,
            nodeIds: [],
            prevFlowStepId: stepId,
            nextFlowStepId,
        };

        try {
            setCreateIsLoading();
            const response = await dispatch(createFlowStep(insertPayload));

            if (createFlowStep.rejected.match(response)) {
                handleServerError(response.error);
            }
            setCreateIsNotLoading();
        } catch (error: unknown) {
            console.error(error);
        } finally {
            setCreateIsNotLoading();
        }
    },
    [
        flowStepPrimaryKey, stepId, nextFlowStepId, dispatch, handleServerError,
        setCreateIsLoading, setCreateIsNotLoading,
    ]);

    const [modalOpen, openModal, closeModal] = useModalOpen();

    return (
        <Box display="flex" alignItems="center" width={1} height={FLOW_STEP_SIZE}>
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
                                sx={{ color: 'toolbar.lightRed' }}
                                onClick={openModal}
                            >
                                <FontAwesomeIcon icon={faDiagramProject} />
                            </IconButton>
                        </Tooltip>
                        {
                            stepId && (
                                <Box display="flex" justifyContent="space-between" width="100%" pr={1}>
                                    <Tooltip title="Delete Flow Step" placement="top">
                                        <IconButton
                                            className="Item"
                                            aria-label="Delete Flow Step"
                                            sx={{ color: 'toolbar.blue' }}
                                            onClick={handleFlowStepDeletion}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
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
                                                    // <DefaultButton
                                                    //     endIcon={<FontAwesomeIcon icon={faChevronRight} />}
                                                    //     onClick={createNextFlowStep}
                                                    //     title="Add Step"
                                                    // />
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
