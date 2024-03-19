import { UUID } from '../../../../../types';
import { selectFlowStep, selectFlowStepPrimaryKey } from '../../../../flow-steps/flowSteps.selectors';
import { WorkflowStepFlow } from '../../../diagram/diagram.types';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

interface FlowStepContextValue {
    id: UUID,
    workflowStepFlow?: WorkflowStepFlow,
}

const FlowStepContext = React.createContext({} as FlowStepContextValue);

export function useFlowStepContextCreator(val: FlowStepContextValue) {
    const { id, workflowStepFlow } = val;
    const flowStepContextValue = useMemo(() => ({
        id,
        workflowStepFlow,
    }), [id, workflowStepFlow]);

    return {
        FlowStepContext,
        flowStepContextValue,
    };
}

export default function useFlowStepContext() {
    const { id, workflowStepFlow } = useContext(FlowStepContext);

    const {
        nodeId,
        workflowId,
        flowId,
        flowIndex,
        nodeIds,
        inputIdsByNodeId = {},
        outputIdsByNodeId = {},
    } = useSelector(selectFlowStep(id));

    const flowStepPrimaryKey = useSelector(selectFlowStepPrimaryKey(id));
    const {
        flowStepNodes, prevFlowStepId, nextFlowStepId, stepId,
    } = workflowStepFlow || {};

    return {
        nodeId,
        workflowId,
        flowId,
        flowIndex,
        id,
        nodeIds,
        inputIdsByNodeId,
        outputIdsByNodeId,
        flowStepPrimaryKey,
        stepId,
        flowStepNodes,
        prevFlowStepId,
        nextFlowStepId,
    };
}
