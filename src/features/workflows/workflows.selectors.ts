import {
    Workflow, WorkflowDiagramObject, WorkflowState,
} from './types';
import { UUID } from '../../types';
import { createSelector } from '@reduxjs/toolkit';

interface State{ workflows: WorkflowState; }

export const selectWorkflowsById = (state: State) => state.workflows.byId;
export const selectWorkflowIdByNodeId = (state: State) => state.workflows.idByNodeId;
export const selectRawSelectedWorkflowObject = (state: State) =>
    state.workflows.selectedWorkflowObject || {} as WorkflowDiagramObject;

export const selectSelectedWorkflowObject = createSelector(
    selectRawSelectedWorkflowObject,
    (selectedWorkflowObject) => selectedWorkflowObject,
);

/* diagram */
export const selectWorkflowDiagramById = (state: State) => state.workflows.workflowDiagramById;
export const selectWorkflowScale = (state: State) => state.workflows.workflowScale;

export const selectWorkflowByNodeId = (nodeId: UUID) => createSelector([
    selectWorkflowIdByNodeId,
    selectWorkflowsById,
], (workflowIdsByNodeId, workflowsById) => {
    const id = workflowIdsByNodeId[nodeId];
    return workflowsById[id];
});

export const selectWorkflowDiagram = (workflowId: UUID) => createSelector(
    selectWorkflowDiagramById,
    (workflowDiagramById) => workflowDiagramById[workflowId],
);

export const selectWorkflow = (workflowId: UUID) => createSelector(
    selectWorkflowsById,
    (workflowsById) => workflowsById[workflowId] || {},
);

export const selectWorkflowAttribute = <K extends keyof Workflow>(workflowId: UUID, attribute: K) => createSelector(
    selectWorkflow(workflowId),
    (workflow) => workflow && workflow[attribute],
);
