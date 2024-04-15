import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useBooleanStateValue from '../../../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../../../common/hooks/useHandleServerErrorAlert';
import useModalOpen from '../../../../../common/hooks/useModalOpen';
import { NodecosmosDispatch } from '../../../../../store';
import {
    NodecosmosError, ObjectType, Strict,
} from '../../../../../types';
import { selectObject } from '../../../../app/app.thunks';
import useBranchParams from '../../../../branch/hooks/useBranchParams';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import { createFlowStep, deleteFlowStep } from '../../../../flow-steps/flowSteps.thunks';
import { FlowStepCreationParams } from '../../../../flow-steps/flowSteps.types';
import { FLOW_TOOLBAR_HEIGHT } from '../../../constants';
import useFlowStepColors from '../../../hooks/diagram/flow-step/useFlowStepColors';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
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
    const { branchId, rootId } = useWorkflowContext();
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

    const [modalOpen, openModal, closeModal] = useModalOpen();

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
                                            sx={{ color: 'toolbar.default' }}
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
