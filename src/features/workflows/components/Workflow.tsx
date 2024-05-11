import WorkflowDiagram from './diagram/WorkflowDiagram';
import WorkflowContainer from './WorkflowContainer';
import WorkflowToolbar from './WorkflowToolbar';
import Alert from '../../../common/components/Alert';
import { UUID } from '../../../types';
import { HEADER_HEIGHT } from '../../app/constants';
import { useWorkflowContextCreator } from '../hooks/useWorkflowContext';
import { Box } from '@mui/material';
import React, { memo } from 'react';

interface Props {
    nodeId: UUID;
    branchId: UUID;
    insidePane?: boolean;
}

const Workflow: React.FC<Props> = ({
    nodeId, branchId, insidePane = false,
}) => {
    const {
        WorkflowContext,
        contextProviderValue,
    } = useWorkflowContextCreator({
        insidePane,
        branchId,
        nodeId,
    });

    return (
        <WorkflowContext.Provider value={contextProviderValue}>
            <WorkflowContainer>
                <WorkflowToolbar />
                {!insidePane && <Alert />}
                <Box height={`calc(100% - ${HEADER_HEIGHT})`}>
                    <WorkflowDiagram />
                </Box>
            </WorkflowContainer>
        </WorkflowContext.Provider>
    );
};

export default memo(Workflow);
