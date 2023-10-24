import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { UUID } from '../../../../../types';
import { selectFlowStep, selectFlowStepPrimaryKey } from '../../../../flow-steps/flowSteps.selectors';
import { WorkflowStepFlow } from '../../../types';

interface FlowStepContextValue {
    id: UUID | null,
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
        inputIdsByNodeId,
        outputIdsByNodeId,
    } = useSelector(selectFlowStep(id));

    const flowStepPrimaryKey = useSelector(selectFlowStepPrimaryKey(id));

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
        workflowStepFlow,
    };
}
