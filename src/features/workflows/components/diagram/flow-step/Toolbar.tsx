import FlowInnerToolbar from './toolbar/FlowInnerToolbar';
import FlowStepInnerToolbar from './toolbar/FlowStepInnerToolbar';
import FlowTitle from './toolbar/FlowTitle';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useFlowColors from '../../../hooks/diagram/flows/useFlowColors';
import { Box } from '@mui/material';
import React from 'react';

// Flow and FlowStep toolbar
export default function Toolbar() {
    const { backgroundColor: flowBg, outlineColor: flowBorder } = useFlowColors();

    return (
        <Box
            pl={2}
            pr={1}
            height={1}
            display="flex"
            alignItems="center"
            style={{
                backgroundColor: flowBg,
                outline: `solid ${flowBorder}`,
                outlineWidth: 1,
                outlineOffset: -1,
            }}>
            <FlowTitle />
            <ToolsContainer ml={1}>
                <FlowInnerToolbar />
                <FlowStepInnerToolbar />
            </ToolsContainer>
        </Box>
    );
}
