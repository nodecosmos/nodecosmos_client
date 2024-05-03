import { Position, UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { selectNode } from '../../../../nodes/nodes.selectors';
import { FlowStepNode } from '../../../diagram/diagram.types';
import useWorkflowContext from '../../useWorkflowContext';
import useFlowStepContext from '../flow-step/useFlowStepContext';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

interface FlowStepNodeContextValue {
    id: UUID,
    flowStepNode?: FlowStepNode,
}

const FlowStepNodeContext = React.createContext({} as FlowStepNodeContextValue);

export function useFlowStepNodeContextCreator(val: FlowStepNodeContextValue) {
    const { id, flowStepNode } = val;

    const flowStepContextValue = useMemo(() => ({
        id,
        flowStepNode,
    }), [id, flowStepNode]);

    return {
        FlowStepNodeContext,
        flowStepContextValue,
    };
}

export default function useFlowStepNodeContext() {
    const { id, flowStepNode } = useContext(FlowStepNodeContext);
    const selectedObject = useSelector(selectSelectedObject);
    const { branchId } = useWorkflowContext();
    const { id: flowStepId } = useFlowStepContext();
    const { title } = useSelector(selectNode(branchId, id));
    const position = flowStepNode?.position || {} as Position;
    const inputIds = flowStepNode?.inputIds || [];
    const outputs = flowStepNode?.outputs || [];
    const isSelected = selectedObject?.objectId === id
        && selectedObject.metadata?.flowStepId === flowStepId;

    return {
        branchId,
        id,
        flowStepId,
        title,
        inputIds,
        position,
        outputs,
        isSelected,
    };
}
