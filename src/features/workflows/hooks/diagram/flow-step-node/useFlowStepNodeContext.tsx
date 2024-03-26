import { Position, UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { selectNodeAttribute } from '../../../../nodes/nodes.selectors';
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
    const context = useContext(FlowStepNodeContext);
    const selectedObject = useSelector(selectSelectedObject);
    const { branchId } = useWorkflowContext();

    const { id: flowStepId } = useFlowStepContext();
    const isSelected = selectedObject?.objectId === context.id
        && selectedObject.metadata?.flowStepId === flowStepId;

    const title = useSelector(selectNodeAttribute(branchId, context.id, 'title'));
    const position = context.flowStepNode?.position || {} as Position;
    const inputIds = context.flowStepNode?.inputIds || [];
    const outputs = context.flowStepNode?.outputs || [];

    return {
        branchId,
        id: context.id,
        flowStepId,
        title,
        inputIds,
        position,
        outputs,
        isSelected,
    };
}
