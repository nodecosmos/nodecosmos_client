import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Position, UUID } from '../../../../../types';
import { FlowStepNode } from '../../../types';
import { selectNodeAttribute } from '../../../../nodes/nodes.selectors';

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
    const inputs = context.flowStepNode?.inputs || [];
    const outputs = context.flowStepNode?.outputs || [];

    return {
        id: context.id,
        title,
        inputs,
        position,
        outputs,
    };
}
