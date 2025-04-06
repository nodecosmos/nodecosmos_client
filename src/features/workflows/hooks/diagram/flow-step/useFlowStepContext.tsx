import { UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
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
    flowStepIndex: number,
}

const FlowStepContext = React.createContext({} as FlowStepContextValue);

export function useFlowStepContextCreator(val: FlowStepContextValue) {
    const {
        id, workflowStepFlow, x, y, yEnd, flowStepIndex,
    } = val;
    const flowStepContextValue = useMemo(() => ({
        id,
        workflowStepFlow,
        x,
        y,
        yEnd,
        flowStepIndex,
    }), [flowStepIndex, id, workflowStepFlow, x, y, yEnd]);

    return useMemo(() => ({
        FlowStepContext,
        flowStepContextValue,
    }), [flowStepContextValue]);
}

export default function useFlowStepContext() {
    const {
        id, workflowStepFlow, x, y, yEnd,
    } = useContext(FlowStepContext);
    const { branchId } = useWorkflowContext();
    const flowStep = useSelector(selectFlowStep(branchId, id));
    const {
        nodeId,
        flowId,
        stepIndex,
        nodeIds,
        inputIdsByNodeId = {},
        outputIdsByNodeId = {},
    } = flowStep || {};
    const flowStepPrimaryKey = useSelector(selectFlowStepPrimaryKey(branchId, id));
    const {
        flowStepNodes, prevStepIndex, nextStepIndex, stepId,
    } = workflowStepFlow || {};
    const selectedObject = useSelector(selectSelectedObject);

    return useMemo(() => ({
        nodeId,
        flowId,
        stepIndex,
        id,
        nodeIds,
        inputIdsByNodeId,
        outputIdsByNodeId,
        flowStepPrimaryKey,
        stepId,
        flowStepNodes,
        prevStepIndex,
        nextStepIndex,
        x,
        y,
        yEnd,
        isSelected: id === selectedObject?.objectId,
        isCreated: !!flowStepPrimaryKey?.id,
    }), [
        nodeId,
        flowId,
        stepIndex,
        id,
        nodeIds,
        inputIdsByNodeId,
        outputIdsByNodeId,
        stepId,
        flowStepNodes,
        prevStepIndex,
        nextStepIndex,
        x,
        y,
        yEnd,
        selectedObject,
        flowStepPrimaryKey,
    ]);
}
