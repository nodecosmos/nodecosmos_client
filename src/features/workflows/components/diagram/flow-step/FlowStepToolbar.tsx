import React, { useCallback } from 'react';
import {
    faDiagramProject, faTrash, faForward,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    IconButton,
    Tooltip, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import { createFlowStep, deleteFlowStep } from '../../../../flow-steps/flowSteps.thunks';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { FLOW_STEP_SIZE, WorkflowDiagramContext } from '../../../workflows.constants';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import { NodecosmosDispatch } from '../../../../../store';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import { WorkflowDiagramObjectType } from '../../../types';
import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import { Strict } from '../../../../../types';
import { FlowStepCreationParams } from '../../../../flow-steps/types';

export default function FlowStepToolbar() {
    const { context: workflowContext } = useWorkflowContext();
    const { hovered } = useWorkflowStepContext();
    const { title: flowTitle, id: flowId } = useFlowContext();
    const {
        flowStepPrimaryKey, stepId, nextFlowStepId,
    } = useFlowStepContext();

    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();

    const handleFlowClick = useCallback(() => {
        if (workflowContext === WorkflowDiagramContext.workflowPage) {
            dispatch(setSelectedWorkflowDiagramObject({
                id: flowId,
                type: WorkflowDiagramObjectType.Flow,
            }));
        }
    }, [dispatch, flowId, workflowContext]);

    const handleFlowStepDeletion = useCallback(() => {
        dispatch(deleteFlowStep(flowStepPrimaryKey));
    }, [dispatch, flowStepPrimaryKey]);

    const [createLoading, setCreateIsLoading, setCreateIsNotLoading] = useBooleanStateValue();

    const createNextFlowStep = useCallback(async () => {
        const insertPayload: Strict<FlowStepCreationParams> = {
            nodeId: flowStepPrimaryKey.nodeId,
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
        flowStepPrimaryKey.nodeId, flowStepPrimaryKey.workflowId, flowStepPrimaryKey.flowId,
        stepId, nextFlowStepId, dispatch, handleServerError,
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
                hovered && (
                    <ToolsContainer>
                        <Tooltip title="Flow Step Nodes" placement="top">
                            <IconButton
                                className="Item"
                                aria-label="Add Node"
                                sx={{ color: 'secondary.main' }}
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
                                            sx={{ color: 'secondary.main' }}
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
                                                        aria-label="Delete Flow Step"
                                                        sx={{ color: 'secondary.main' }}
                                                        onClick={createNextFlowStep}>
                                                        <FontAwesomeIcon
                                                            icon={faForward} />
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
