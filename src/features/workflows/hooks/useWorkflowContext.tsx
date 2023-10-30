import { UUID } from '../../../types';
import { WorkflowDiagramContext } from '../workflows.constants';
import { selectWorkflow, selectWorkflowScale } from '../workflows.selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

type WorkflowContextType = {
    context: WorkflowDiagramContext;
    id: UUID;
    nodeId: UUID;
};

const WorkflowContext = React.createContext<WorkflowContextType>({} as WorkflowContextType);

export function useWorkflowContextCreator({
    context, id, nodeId,
}: WorkflowContextType) {
    const contextProviderValue = useMemo(() => ({ context, id, nodeId }), [context, id, nodeId]);

    return {
        WorkflowContext,
        contextProviderValue,
    };
}

export default function useWorkflowContext() {
    const {
        context, id, nodeId,
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
        rootNodeId,
        title,
        initialInputIds,
        transformableId,
        scale,
    };
}
