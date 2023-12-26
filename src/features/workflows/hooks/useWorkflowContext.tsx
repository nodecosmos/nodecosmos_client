import { UUID } from '../../../types';
import { WorkflowDiagramContext } from '../constants';
import { selectWorkflow, selectWorkflowScale } from '../workflow.selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

type WorkflowContextType = {
    context: WorkflowDiagramContext;
    id: UUID;
    nodeId: UUID;
    branchId: UUID;
};

const WorkflowContext = React.createContext<WorkflowContextType>({} as WorkflowContextType);

export function useWorkflowContextCreator({
    context, id, nodeId, branchId,
}: WorkflowContextType) {
    const contextProviderValue = useMemo(() => ({
        context,
        id,
        nodeId,
        branchId,
    }), [branchId, context, id, nodeId]);

    return {
        WorkflowContext,
        contextProviderValue,
    };
}

export default function useWorkflowContext() {
    const {
        context, id, nodeId, branchId,
    } = React.useContext(WorkflowContext);

    if (context === undefined) {
        throw new Error('useWorkflowContext must be used within a WorkflowContext.Provider');
    }

    const {
        rootNodeId,
        title,
        initialInputIds,
    } = useSelector(selectWorkflow(id));

    const transformableId = `WF_${context}_${id}`;
    const scale = useSelector(selectWorkflowScale);

    return {
        context,
        id,
        nodeId,
        branchId,
        rootNodeId,
        title,
        initialInputIds,
        transformableId,
        scale,
    };
}
