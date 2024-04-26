import WorkflowDiagram from './diagram/WorkflowDiagram';
import WorkflowContainer from './WorkflowContainer';
import WorkflowToolbar from './WorkflowToolbar';
import Alert from '../../../common/components/Alert';
import { UUID } from '../../../types';
import { HEADER_HEIGHT } from '../../app/constants';
import { WorkflowDiagramContext } from '../constants';
import { useWorkflowContextCreator } from '../hooks/useWorkflowContext';
import { Box } from '@mui/material';
import React, { memo } from 'react';

interface DefaultProps {
    context: WorkflowDiagramContext;
}

interface Props extends Partial<DefaultProps> {
    nodeId: UUID;
    branchId: UUID;
    context?: WorkflowDiagramContext;
}

const Workflow: React.FC<Props> = ({
    nodeId, branchId, context = WorkflowDiagramContext.workflowPage,
}) => {
    const {
        WorkflowContext,
        contextProviderValue,
    } = useWorkflowContextCreator({
        context,
        branchId,
        nodeId,
    });

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
