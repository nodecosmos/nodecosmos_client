import FlowInnerToolbar from './toolbar/FlowInnerToolbar';
import FlowStepInnerToolbar from './toolbar/FlowStepInnerToolbar';
import FlowTitle from './toolbar/FlowTitle';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowColors from '../../../hooks/diagram/flows/useFlowColors';
import useWorkflowBranch from '../../../hooks/useWorkflowBranch';
import { Box } from '@mui/material';
import React from 'react';

// Flow and FlowStep toolbar
export default function Toolbar() {
    const { id: flowStepId } = useFlowStepContext();
    const { isFlowStepCreated, isFlowStepDeleted } = useWorkflowBranch();
    const { outlineColor: flowBorder, backgroundColor: flowBg } = useFlowColors();

    return (
        <Box
            pl={2}
            pr={1}
            height={1}
            display="flex"
            alignItems="center"
            style={{
                border: `1px solid ${flowBorder}`,
                backgroundColor: isFlowStepCreated(flowStepId) || isFlowStepDeleted(flowStepId)
                    ? 'transparent' : flowBg,
            }}>
            <FlowTitle />
            <ToolsContainer ml={1}>
                <FlowInnerToolbar />
                <FlowStepInnerToolbar />
            </ToolsContainer>
        </Box>
    );
}
