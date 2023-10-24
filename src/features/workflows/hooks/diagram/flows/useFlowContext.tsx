import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';
import { UUID } from '../../../../../types';
import { selectFlow } from '../../../../flows/flows.selectors';

interface FlowContextValue {
    id: UUID
}

const FlowContext = React.createContext({} as FlowContextValue);

export function useFlowContextCreator(val: FlowContextValue) {
    const flowContextValue = useMemo(() => ({ id: val.id }), [val.id]);

    return {
        FlowContext,
        flowContextValue,
    };
}

export default function useFlowContext() {
    const context = useContext(FlowContext);

    const {
        nodeId,
        workflowId,
        startIndex,
        verticalIndex,
        id,
        title,
    } = useSelector(selectFlow(context.id));

    return {
        nodeId,
        workflowId,
        startIndex,
        verticalIndex,
        id,
        title,
    };
}
