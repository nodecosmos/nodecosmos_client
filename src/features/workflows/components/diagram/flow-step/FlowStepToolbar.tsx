import React, { useCallback, useState } from 'react';
import { faDiagramProject, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    IconButton,
    Tooltip, Typography,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import FlowStepModal from '../../../../flow-steps/components/FlowStepModal';
import { deleteFlowStep } from '../../../../flow-steps/flowSteps.thunks';
import useWorkflowStepContext from '../../../hooks/diagram/workflow-steps/useWorkflowStepContext';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import { FLOW_STEP_SIZE, WORKFLOW_DIAGRAM_CONTEXT } from '../../../workflows.constants';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import { NodecosmosDispatch } from '../../../../../store';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';

export default function FlowStepToolbar() {
    const { title: flowTitle } = useFlowContext();
    const { context: workflowContext } = useWorkflowContext();
    const {
        flowId,
        flowStepPrimaryKey,
        workflowStepFlow,
    } = useFlowStepContext();

    const dispatch: NodecosmosDispatch = useDispatch();

    const handleFlowClick = useCallback(() => {
        if (workflowContext === WORKFLOW_DIAGRAM_CONTEXT.workflowPage) {
            dispatch(setSelectedWorkflowDiagramObject({
                id: flowId,
                type: 'flow',
            }));
        }
    }, [dispatch, flowId, workflowContext]);

    const handleFlowStepDeletion = () => {
        dispatch(deleteFlowStep(flowStepPrimaryKey));
    };

    const [addFlopStepNodesModalOpen, setAddFlowStepNodesModalOpen] = useState(false);

    const { hovered } = useWorkflowStepContext();

    return (
        <Box display="flex" alignItems="center" height={FLOW_STEP_SIZE}>
            <Typography
                onClick={handleFlowClick}
                variant="body1"
                fontWeight={600}
                color="text.tertiary"
                sx={{
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
                                sx={{ color: 'toolbar.lightRed' }}
                                onClick={() => setAddFlowStepNodesModalOpen(true)}
                            >
                                <FontAwesomeIcon icon={faDiagramProject} />
                            </IconButton>
                        </Tooltip>
                        {
                            workflowStepFlow && (
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
                            )
                        }
                    </ToolsContainer>
                )
            }
            <FlowStepModal open={addFlopStepNodesModalOpen} onClose={() => setAddFlowStepNodesModalOpen(false)} />
        </Box>
    );
}
