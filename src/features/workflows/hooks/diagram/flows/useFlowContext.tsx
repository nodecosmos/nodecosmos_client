import { UUID } from '../../../../../types';
import { selectFlow } from '../../../../flows/flows.selectors';
import { selectSelectedWorkflowObject } from '../../../workflow.selectors';
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

    const { id: selectedObjectId } = useSelector(selectSelectedWorkflowObject);
    const flowSelected = id === selectedObjectId;

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
