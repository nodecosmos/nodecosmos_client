import FlowInnerToolbar from './toolbar/FlowInnerToolbar';
import FlowStepInnerToolbar from './toolbar/FlowStepInnerToolbar';
import FlowTitle from './toolbar/FlowTitle';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import { FLOW_TOOLBAR_HEIGHT } from '../../../constants';
import useFlowColors from '../../../hooks/diagram/flows/useFlowColors';
import { Box } from '@mui/material';
import React from 'react';

// Flow and FlowStep toolbar
export default function FlowToolbar() {
    const { backgroundColor: flowBg, outlineColor: flowBorder } = useFlowColors();

    return (
        <Box
            pl={2}
            display="flex"
            alignItems="center"
            width={1}
            height={FLOW_TOOLBAR_HEIGHT}
            style={{
                backgroundColor: flowBg,
                borderColor: flowBorder,
                border: 1,
            }}>
            <FlowTitle />
            <ToolsContainer>
                <FlowInnerToolbar />
                <FlowStepInnerToolbar />
            </ToolsContainer>
        </Box>
    );
}
