import { Position, UUID } from '../../../../../types';
import { selectNodeAttribute } from '../../../../nodes/nodes.selectors';
import { FlowStepNode } from '../../../diagram/types';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

interface FlowStepNodeContextValue {
    id: UUID,
    flowStepNode?: FlowStepNode,
}

const FlowStepNodeContext = React.createContext({} as FlowStepNodeContextValue);

export function useFlowStepNodeContextCreator(val: FlowStepNodeContextValue) {
    const { id, flowStepNode } = val;

    const flowStepContextValue = useMemo(() => ({ id, flowStepNode }), [id, flowStepNode]);

    return {
        FlowStepNodeContext,
        flowStepContextValue,
    };
}

export default function useFlowStepNodeContext() {
    const context = useContext(FlowStepNodeContext);

    const title = useSelector(selectNodeAttribute(context.id, 'title'));
    const position = context.flowStepNode?.position || {} as Position;
    const inputIds = context.flowStepNode?.inputIds || [];
    const outputs = context.flowStepNode?.outputs || [];

    return {
        id: context.id,
        title,
        inputIds,
        position,
        outputs,
    };
}
