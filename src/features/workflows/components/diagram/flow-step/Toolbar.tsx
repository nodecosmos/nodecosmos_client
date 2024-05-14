import FlowInnerToolbar from './toolbar/FlowInnerToolbar';
import FlowStepInnerToolbar from './toolbar/FlowStepInnerToolbar';
import FlowTitle from './toolbar/FlowTitle';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useFlowColors from '../../../hooks/diagram/flows/useFlowColors';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../hooks/useWorkflowBranch';
import { Box } from '@mui/material';
import React from 'react';

// Flow and FlowStep toolbar
export default function Toolbar() {
    const { id, isSelected } = useFlowContext();
    const { isFlowCreated, isFlowDeleted } = useWorkflowBranch();
    const { outlineColor: flowBorder, backgroundColor: flowBg } = useFlowColors();

    return (
        <Box
            pl={2}
            pr={1}
            height={1}
            display="flex"
            alignItems="center"
            style={{
                outline: `solid ${flowBorder}`,
                outlineWidth: isFlowCreated(id) || isFlowDeleted(id) || isSelected ? 1 : 0,
                outlineOffset: isFlowCreated(id) || isFlowDeleted(id) || isSelected ? -1 : 0,
                borderBottom: isFlowCreated(id) ? 'none' : `1px solid ${flowBorder}`,
                backgroundColor: flowBg,
            }}>
            <FlowTitle />
            <ToolsContainer ml={1}>
                <FlowInnerToolbar />
                <FlowStepInnerToolbar />
            </ToolsContainer>
        </Box>
    );
}
