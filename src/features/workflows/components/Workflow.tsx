import WorkflowDiagram from './diagram/WorkflowDiagram';
import WorkflowContainer from './WorkflowContainer';
import WorkflowToolbar from './WorkflowToolbar';
import Alert from '../../../common/components/Alert';
import { HEADER_HEIGHT } from '../../app/constants';
import { useWorkflowContextCreator } from '../hooks/useWorkflowContext';
import { WorkflowDiagramContext } from '../workflows.constants';
import { selectWorkflowByNodeId } from '../workflows.selectors';
import { Box } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

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
                <Alert />
                <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                    <WorkflowDiagram />
                </Box>
            </WorkflowContainer>
        </WorkflowContext.Provider>
    );
};

export default memo(Workflow);
