import { UUID } from '../../../../../types';
import { maybeSelectFlow } from '../../../../flows/flows.selectors';
import { WorkflowStepFlow as WorkflowStepFlowType } from '../../../diagram/diagram.types';
import { useFlowStepContextCreator } from '../../../hooks/diagram/flow-step/useFlowStepContext';
import { useFlowContextCreator } from '../../../hooks/diagram/flows/useFlowContext';
import useWorkflowContext from '../../../hooks/useWorkflowContext';
import FlowStep from '../flow-step/FlowStep';
import React from 'react';
import { useSelector } from 'react-redux';

interface Props {
    workflowStepFlow: WorkflowStepFlowType;
}

export default function WorkflowStepFlow({ workflowStepFlow }: Props) {
    const { branchId } = useWorkflowContext();
    const { FlowContext, flowContextValue } = useFlowContextCreator({ id: workflowStepFlow.id });
    const {
        x, y, yEnd,
    } = workflowStepFlow.position;
    const {
        FlowStepContext,
        flowStepContextValue,
    } = useFlowStepContextCreator({
        x,
        y,
        yEnd,
        id: workflowStepFlow.stepId as UUID,
        workflowStepFlow,
    });

    const flow = useSelector(maybeSelectFlow(branchId, workflowStepFlow.id));

    if (!flow) {
        return null;
    }

    return (
        <FlowContext.Provider value={flowContextValue}>
            <FlowStepContext.Provider value={flowStepContextValue}>
                <g>

                    <FlowStep />
                </g>
            </FlowStepContext.Provider>
        </FlowContext.Provider>
    );
}
