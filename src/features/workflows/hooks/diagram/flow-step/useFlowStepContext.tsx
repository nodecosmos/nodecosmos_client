import { UUID } from '../../../../../types';
import { selectFlowStep, selectFlowStepPrimaryKey } from '../../../../flow-steps/flowSteps.selectors';
import { WorkflowStepFlow } from '../../../diagram/diagram.types';
import useWorkflowContext from '../../useWorkflowContext';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

interface FlowStepContextValue {
    id: UUID,
    workflowStepFlow?: WorkflowStepFlow,
    x: number,
    y: number,
    yEnd: number,
}

const FlowStepContext = React.createContext({} as FlowStepContextValue);

export function useFlowStepContextCreator(val: FlowStepContextValue) {
    const {
        id, workflowStepFlow, x, y, yEnd,
    } = val;
    const flowStepContextValue = useMemo(() => ({
        id,
        workflowStepFlow,
        x,
        y,
        yEnd,
    }), [id, workflowStepFlow, x, y, yEnd]);

    return {
        FlowStepContext,
        flowStepContextValue,
    };
}

export default function useFlowStepContext() {
    const {
        id, workflowStepFlow, x, y, yEnd,
    } = useContext(FlowStepContext);
    const { branchId } = useWorkflowContext();

    const flowStep = useSelector(selectFlowStep(branchId, id));

    const {
        nodeId,
        workflowId,
        flowId,
        flowIndex,
        nodeIds,
        inputIdsByNodeId = {},
        outputIdsByNodeId = {},
    } = flowStep || {};

    const flowStepPrimaryKey = useSelector(selectFlowStepPrimaryKey(branchId, id));
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
        x,
        y,
        yEnd,
    };
}
