import FlowInnerToolbar from './toolbar/FlowInnerToolbar';
import FlowStepInnerToolbar from './toolbar/FlowStepInnerToolbar';
import FlowTitle from './toolbar/FlowTitle';
import ToolsContainer from '../../../../../common/components/tools/ToolsContainer';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import useFlowStepContext from '../../../hooks/diagram/flow-step/useFlowStepContext';
import useFlowColors from '../../../hooks/diagram/flows/useFlowColors';
import useFlowContext from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowBranch from '../../../hooks/useWorkflowBranch';
import ObjectCommentsBadge from '../ObjectCommentBadge';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';

// Flow and FlowStep toolbar
export default function Toolbar() {
    const { id: flowId, isSelected } = useFlowContext();
    const { id: flowStepId } = useFlowStepContext();
    const { isFlowStepCreated, isFlowStepDeleted } = useWorkflowBranch();
    const { outlineColor: flowBorder, backgroundColor: flowBg } = useFlowColors();
    const { isBranch } = useBranchContext();
    const style = useMemo(() => {
        return {
            border: '1px solid',
            borderColor: isSelected ? flowBorder : 'transparent',
            borderBottomColor: flowBorder,
            backgroundColor: isFlowStepCreated(flowStepId) || isFlowStepDeleted(flowStepId)
                ? 'transparent' : flowBg,
        };
    }, [flowBg, flowBorder, flowStepId, isFlowStepCreated, isFlowStepDeleted, isSelected]);

    return (
        <Box
            pl={2}
            pr={1}
            height={1}
            display="flex"
            alignItems="center"
            style={style}>
            <FlowTitle />
            <ToolsContainer ml={1}>
                {isBranch && <ObjectCommentsBadge id={flowId} mr={1} />}
                <FlowInnerToolbar />
                <FlowStepInnerToolbar />
                {isBranch && <ObjectCommentsBadge id={flowStepId} justifyContent="end" />}
            </ToolsContainer>
        </Box>
    );
}
