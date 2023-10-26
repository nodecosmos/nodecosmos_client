import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { WorkflowDiagramContext } from '../workflows.constants';
import { useWorkflowContextCreator } from '../hooks/useWorkflowContext';
import { selectWorkflowByNodeId } from '../workflows.selectors';
import { HEADER_HEIGHT } from '../../app/constants';
import { selectFlowsByWorkflowId } from '../../flows/flows.selectors';
import { selectFlowStepsByWorkflowId } from '../../flow-steps/flowSteps.selectors';
import { selectIOByWorkflowId } from '../../input-outputs/inputOutputs.selectors';
import { rebuildWorkflowDiagram } from '../workflowsSlice';
import { NodecosmosDispatch } from '../../../store';
import WorkflowDiagram from './diagram/WorkflowDiagram';
import WorkflowToolbar from './WorkflowToolbar';
import WorkflowContainer from './WorkflowContainer';

interface DefaultProps {
    context: WorkflowDiagramContext;
}

interface Props extends Partial<DefaultProps> {
    nodeId: string;
    context?: WorkflowDiagramContext;
}

const Workflow: React.FC<Props> = ({ nodeId, context = WorkflowDiagramContext.workflowPage }) => {
    const dispatch: NodecosmosDispatch = useDispatch();
    const workflow = useSelector(selectWorkflowByNodeId(nodeId));
    const { id, initialInputIds } = workflow;

    const {
        WorkflowContext,
        contextProviderValue,
    } = useWorkflowContextCreator({ context, nodeId, id });

    const flows = useSelector(selectFlowsByWorkflowId(id));
    const flowSteps = useSelector(selectFlowStepsByWorkflowId(id));
    const inputOutputs = useSelector(selectIOByWorkflowId(id));

    useEffect(() => {
        dispatch(rebuildWorkflowDiagram({ id, data: { initialInputIds, flows, flowSteps, inputOutputs } }));
    }, [dispatch, id, initialInputIds, flows, flowSteps, inputOutputs]);

    return (
        <WorkflowContext.Provider value={contextProviderValue}>
            <WorkflowContainer>
                <WorkflowToolbar />
                <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                    <WorkflowDiagram />
                </Box>
            </WorkflowContainer>
        </WorkflowContext.Provider>
    );
};

export default Workflow;
