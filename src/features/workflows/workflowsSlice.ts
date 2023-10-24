import { createSlice } from '@reduxjs/toolkit';
import { createFlow, deleteFlow } from '../flows/flows.thunks';
import { createIO, deleteIO } from '../input-outputs/inputOutputs.thunks';
import { createFlowStep, deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import {
    createWorkflow, deleteWorkflow, showWorkflow, updateWorkflowInitialInputs,
} from './workflows.thunks';
import { WorkflowState } from './types';
import { getScale } from './workflows.helpers';
import { addWorkflow } from './reducers/workflowAdd';
import { buildWorkflowDiagram } from './reducers/workflowDiagram';

const initialState: WorkflowState = {
    byId: {},
    idByNodeId: {},
    // diagram
    workflowDiagramById: {},
    selectedWorkflowObject: null,
    workflowScale: getScale(),
    // pane
    isWfPaneOpen: true,
};

const workflowsSlice = createSlice({
    name: 'workflows',
    initialState,
    reducers: {
        setSelectedWorkflowDiagramObject(state, action) {
            state.selectedWorkflowObject = action.payload;
        },
        clearSelectedWorkflowDiagramObject(state) {
            state.selectedWorkflowObject = null;
        },
        setIsWfPaneOpen(state, action) {
            state.isWfPaneOpen = action.payload;
        },
        setWorkflowScale(state, action) {
            localStorage.setItem('workflowScale', action.payload);
            state.workflowScale = action.payload;
        },
        updateWorkflow(state, action) {
            state.byId[action.payload.id] = { ...state.byId[action.payload.id], ...action.payload };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                addWorkflow(state, action);
                buildWorkflowDiagram(state, action);
            })
            .addCase(createWorkflow.fulfilled, (state, action) => {
                addWorkflow(state, action);

                const { workflow } = action.payload;
                buildWorkflowDiagram(state,
                    { payload: { workflow, flows: [], flowSteps: [], inputOutputs: [] }, type: action.type },
                );
            })
            .addCase(deleteWorkflow.fulfilled, (state, action) => {
                const { workflow } = action.payload;
                const { id, nodeId } = workflow;

                delete state.byId[id];
                delete state.idByNodeId[nodeId];
            })
            .addCase(createFlow.fulfilled, () => {})
            .addCase(deleteFlow.fulfilled, () => {})
            .addCase(createFlowStep.fulfilled, () => {})
            .addCase(deleteFlowStep.fulfilled, () => {})
            .addCase(updateWorkflowInitialInputs.fulfilled, () => {})
            .addCase(createIO.fulfilled, () => {})
            .addCase(deleteIO.fulfilled, () => {});
    },
});

const {
    actions,
    reducer,
} = workflowsSlice;

export const {
    setSelectedWorkflowDiagramObject,
    setIsWfPaneOpen,
    setWorkflowScale,
    clearSelectedWorkflowDiagramObject,
    updateWorkflow,
} = actions;

export default reducer;
