import { UUID } from '../../../../../types';
import { selectSelectedObject } from '../../../../app/app.selectors';
import { selectFlow } from '../../../../flows/flows.selectors';
import useWorkflowContext from '../../useWorkflowContext';
import React, { useMemo, useContext } from 'react';
import { useSelector } from 'react-redux';

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
    const { id } = useContext(FlowContext);
    const { branchId } = useWorkflowContext();
    const {
        nodeId,
        workflowId,
        startIndex,
        verticalIndex,
        title,
    } = useSelector(selectFlow(branchId, id));
    const selectedObject = useSelector(selectSelectedObject);
    const flowSelected = id === selectedObject?.objectId;

    return {
        nodeId,
        workflowId,
        startIndex,
        verticalIndex,
        id,
        title,
        flowSelected,
    };
}
