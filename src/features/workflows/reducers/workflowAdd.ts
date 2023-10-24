import { PayloadAction } from '@reduxjs/toolkit';
import { Workflow, WorkflowState } from '../types';

export function addWorkflow(state: WorkflowState, action: PayloadAction<{ workflow: Workflow }>) {
    const { workflow } = action.payload;
    const { id, nodeId } = workflow;

    workflow.initialInputIds = workflow.initialInputIds || [];

    state.byId[id] = workflow;

    state.idByNodeId[nodeId] = id;
}
