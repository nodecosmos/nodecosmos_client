import { PayloadAction } from '@reduxjs/toolkit';
import { WorkflowState } from '../types';
import { ShowWorkflowResponse } from '../workflows.thunks';

export function addWorkflow(state: WorkflowState, action: PayloadAction<ShowWorkflowResponse>) {
    const { workflow } = action.payload;
    const { id, nodeId } = workflow;

    workflow.initialInputIds = workflow.initialInputIds || [];

    state.byId[id] = workflow;

    state.idByNodeId[nodeId] = id;
}
