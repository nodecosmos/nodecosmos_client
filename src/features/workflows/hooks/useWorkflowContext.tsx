import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectWorkflow, selectWorkflowDiagram, selectWorkflowScale,
} from '../workflows.selectors';
import { selectTransformablePositionAttribute } from '../../app/app.selectors';
import { WorkflowDiagramContext } from '../workflows.constants';
import { UUID } from '../../../types';
import { WorkflowDiagram } from '../diagram/types';

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

    const diagram: WorkflowDiagram = useSelector(selectWorkflowDiagram(id));

    const transformableId = `WF_${context}_${id}`;
    const clientHeight = useSelector(selectTransformablePositionAttribute(transformableId, 'clientHeight'));
    const scale = useSelector(selectWorkflowScale);

    const wfHeight = (diagram.height > clientHeight ? diagram.height : clientHeight) + 200;

    return {
        context,
        id,
        nodeId,
        rootNodeId,
        title,
        initialInputIds,
        diagram,
        transformableId,
        wfHeight,
        scale,
    };
}
