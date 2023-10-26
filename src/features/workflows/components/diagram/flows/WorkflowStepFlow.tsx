import React from 'react';
import { Box } from '@mui/material';
import { FLOW_STEP_SIZE, WORKFLOW_STEP_WIDTH } from '../../../workflows.constants';
import FlowStep from '../flow-step/FlowStep';
import FlowStepToolbar from '../flow-step/FlowStepToolbar';
import { WorkflowStepFlow as WorkflowStepFlowType } from '../../../diagram/types';
import { useFlowContextCreator } from '../../../hooks/diagram/flows/useFlowContext';
import { useFlowStepContextCreator } from '../../../hooks/diagram/flow-step/useFlowStepContext';

interface Props {
    workflowStepFlow: WorkflowStepFlowType;
}

export default function WorkflowStepFlow({ workflowStepFlow }: Props) {
    const { FlowContext, flowContextValue } = useFlowContextCreator({ id: workflowStepFlow.id });
    const {
        FlowStepContext,
        flowStepContextValue,
    } = useFlowStepContextCreator({ id: workflowStepFlow.stepId, workflowStepFlow });

    const { x, y } = workflowStepFlow.position;

    return (
        <FlowContext.Provider value={flowContextValue}>
            <FlowStepContext.Provider value={flowStepContextValue}>
                <g>
                    <foreignObject
                        x={x}
                        y={y}
                        width={WORKFLOW_STEP_WIDTH + 1}
                        height={FLOW_STEP_SIZE}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            height="calc(100% - 3px)"
                            pl={2}
                            borderTop={1}
                            borderBottom={1}
                            borderColor="borders.1"
                            color="text.tertiary"
                            zIndex={1}
                            position="relative"
                        >
                            <FlowStepToolbar />
                        </Box>

                    </foreignObject>
                    <FlowStep />
                </g>
            </FlowStepContext.Provider>
        </FlowContext.Provider>
    );
}
