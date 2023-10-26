import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { WorkflowDiagramContext } from '../workflows.constants';
import { useWorkflowContextCreator } from '../hooks/useWorkflowContext';
import { HEADER_HEIGHT } from '../../app/constants';
import { selectWorkflowByNodeId } from '../workflows.selectors';
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
    const workflow = useSelector(selectWorkflowByNodeId(nodeId));
    const id = workflow?.id;

    const {
        WorkflowContext,
        contextProviderValue,
    } = useWorkflowContextCreator({ context, nodeId, id });

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
