import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { WorkflowDiagramContext } from '../workflows.constants';
import { useWorkflowContextCreator } from '../hooks/useWorkflowContext';
import { selectWorkflowByNodeId } from '../workflows.selectors';
import { HEADER_HEIGHT } from '../../app/constants';
import WorkflowContainer from './WorkflowContainer';
import WorkflowToolbar from './WorkflowToolbar';
import WorkflowDiagram from './diagram/WorkflowDiagram';

interface DefaultProps {
    context: WorkflowDiagramContext;
}

interface Props extends Partial<DefaultProps> {
    nodeId: string;
    context?: WorkflowDiagramContext;
}

const Workflow: React.FC<Props> = ({ nodeId, context = WorkflowDiagramContext.workflowPage }) => {
    const workflow = useSelector(selectWorkflowByNodeId(nodeId));

    const {
        WorkflowContext,
        contextProviderValue,
    } = useWorkflowContextCreator({ context, nodeId, id: workflow?.id });

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
