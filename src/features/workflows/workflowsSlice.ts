import { buildWorkflowDiagram, BuildWorkflowDiagramData } from './diagram/diagram';
import {
    createWorkflow, deleteWorkflow, showWorkflow, updateWorkflowInitialInputs,
} from './worfklow.thunks';
import { WorkflowState } from './workflow.types';
import { getScale } from './workflow.utils';
import { UUID } from '../../types';
import { deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import { deleteFlow } from '../flows/flows.thunks';
import { deleteIO } from '../input-outputs/inputOutputs.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: WorkflowState = {
    byBranchId: {},
    // diagram
    workflowDiagramByBranchId: {},
    selectedWorkflowObject: null,
    workflowScale: getScale(),
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
        setWorkflowScale(state, action) {
            localStorage.setItem('workflowScale', action.payload);
            state.workflowScale = action.payload;
        },
        updateWorkflow(state, action) {
            const workflow = state.byBranchId[action.payload.branchId][action.payload.id];

            state.byBranchId[action.payload.branchId][action.payload.id] = {
                ...workflow,
                ...action.payload,
            };
        },
        rebuildWorkflowDiagram(state, action) {
            const {
                id, branchId, data,
            } = action.payload;

            state.workflowDiagramByBranchId[branchId][id] = buildWorkflowDiagram(data);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const {
                    workflow, flows, flowSteps, inputOutputs,
                } = action.payload;
                const { branchId, id } = workflow;

                workflow.initialInputIds ||= [];
                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][id] = workflow;

                const data = {
                    initialInputIds: workflow.initialInputIds,
                    flows,
                    flowSteps,
                    inputOutputs,
                };
                state.workflowDiagramByBranchId[branchId][id] = buildWorkflowDiagram(data);
            })
            .addCase(createWorkflow.fulfilled, (state, action) => {
                const { workflow } = action.payload;
                const { id, branchId } = workflow;

                workflow.initialInputIds ||= [];
                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][id] = workflow;

                const data = { initialInputIds: workflow.initialInputIds };
                state.workflowDiagramByBranchId[branchId][id] = buildWorkflowDiagram(data as BuildWorkflowDiagramData);
            })
            .addCase(createWorkflow.rejected, (state, action) => {
                const workflow = action?.payload?.workflow;

                if (workflow) {
                    const { id, branchId } = workflow;

                    workflow.initialInputIds ||= [];
                    state.byBranchId[branchId] ||= {};
                    state.byBranchId[branchId][id] = workflow;

                    const data = { initialInputIds: workflow.initialInputIds };
                    state.workflowDiagramByBranchId[branchId][id]
                        = buildWorkflowDiagram(data as BuildWorkflowDiagramData);
                }
            })
            .addCase(deleteWorkflow.fulfilled, (state, action) => {
                const workflow = action.payload;
                const { id, branchId } = workflow;

                delete state.byBranchId[branchId][id];
                delete state.workflowDiagramByBranchId[branchId][id];

                state.selectedWorkflowObject = null;
            })
            .addCase(deleteFlow.fulfilled, (state) => {
                // currently flows are deleted only from the pane
                state.selectedWorkflowObject = null;
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const { outputIdsByNodeId, nodeIds } = flowStep;

                // check step
                if (state.selectedWorkflowObject?.id === flowStep.id) {
                    state.selectedWorkflowObject = null;
                }

                // check nodes
                if (nodeIds?.some((id: UUID) => state.selectedWorkflowObject?.id === id)) {
                    state.selectedWorkflowObject = null;
                }

                // check outputs
                if (!outputIdsByNodeId) return;

                if (Object.values(outputIdsByNodeId).flat().some((id) => state.selectedWorkflowObject?.id === id)) {
                    state.selectedWorkflowObject = null;
                }
            })
            .addCase(updateWorkflowInitialInputs.fulfilled, (state, action) => {
                const workflow = action.payload;
                const { initialInputIds } = workflow;

                state.byBranchId[workflow.branchId][workflow.id].initialInputIds = initialInputIds;
            })
            .addCase(deleteIO.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const workflowId = inputOutput.workflowId as UUID;
                const branchId = inputOutput.branchId as UUID;
                const { initialInputIds } = state.byBranchId[branchId][workflowId];

                if (state.selectedWorkflowObject?.id === inputOutput.id) {
                    state.selectedWorkflowObject = null;
                }

                if (initialInputIds.includes(inputOutput.id as UUID)) {
                    state.byBranchId[branchId][workflowId].initialInputIds
                        = initialInputIds.filter((id) => id !== inputOutput.id);
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
    setWorkflowScale,
    clearSelectedWorkflowDiagramObject,
    updateWorkflow,
    rebuildWorkflowDiagram,
} = actions;

export default reducer;
