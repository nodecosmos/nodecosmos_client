import { createSlice } from '@reduxjs/toolkit';
import { createFlow, deleteFlow } from '../flows/flows.thunks';
import { createIO, deleteIO } from '../input-outputs/inputOutputs.thunks';
import { createFlowStep, deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import {
    createWorkflow, deleteWorkflow, showWorkflow, updateWorkflowInitialInputs,
} from './workflows.thunks';
import { WorkflowState } from './types';
import { getScale } from './workflows.helpers';
import { buildWorkflowDiagram, BuildWorkflowDiagramData } from './diagram/diagram';

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
        rebuildWorkflowDiagram(state, action) {
            const { id, data } = action.payload;

            state.workflowDiagramById[id] = buildWorkflowDiagram(data);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const {
                    workflow, flows, flowSteps, inputOutputs,
                } = action.payload;
                const { id, nodeId } = workflow;

                workflow.initialInputIds ||= [];
                state.byId[id] = workflow;
                state.idByNodeId[nodeId] = id;

                const data = {
                    initialInputIds: workflow.initialInputIds,
                    flows,
                    flowSteps,
                    inputOutputs,
                };
                state.workflowDiagramById[workflow.id] = buildWorkflowDiagram(data);
            })
            .addCase(createWorkflow.fulfilled, (state, action) => {
                const { workflow } = action.payload;
                const { id, nodeId } = workflow;

                workflow.initialInputIds ||= [];
                state.byId[id] = workflow;
                state.idByNodeId[nodeId] = id;

                const data = { initialInputIds: workflow.initialInputIds };
                state.workflowDiagramById[workflow.id] = buildWorkflowDiagram(data as BuildWorkflowDiagramData);
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
            .addCase(updateWorkflowInitialInputs.fulfilled, (state, action) => {
                const { workflow } = action.payload;
                const { initialInputIds } = workflow;

                state.byId[workflow.id].initialInputIds = initialInputIds;
            })
            .addCase(createIO.fulfilled, () => {})
            .addCase(deleteIO.fulfilled, (state, action) => {
                const { inputOutput } = action.payload;

                if (state.selectedWorkflowObject?.id === inputOutput.id) {
                    state.selectedWorkflowObject = null;
                }
            });
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
    rebuildWorkflowDiagram,
} = actions;

export default reducer;
