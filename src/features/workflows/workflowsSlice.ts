import { buildWorkflowDiagram, BuildWorkflowDiagramData } from './diagram/diagram';
import {
    createWorkflow, deleteWorkflow, showWorkflow, updateWorkflowInitialInputs,
} from './worfklow.thunks';
import { WorkflowState } from './workflow.types';
import { getScale } from './workflow.utils';
import { UUID } from '../../types';
import { deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import { deleteFlow } from '../flows/flows.thunks';
import { deleteIo } from '../input-outputs/inputOutputs.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WorkflowState = {
    byBranchId: {},
    idByBranchAndNodeId: {},
    // diagram
    workflowDiagramByBranchId: {},
    workflowScale: getScale(),
};

const workflowsSlice = createSlice({
    name: 'workflows',
    initialState,
    reducers: {
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
        rebuildWorkflowDiagram(
            state,
            action: PayloadAction<{ id: UUID, branchId: UUID, data: BuildWorkflowDiagramData }>,
        ) {
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
                workflow.initialInputIds = workflow.initialInputIds
                    .filter((value, index, array) => array.indexOf(value) === index);
                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][id] = workflow;
                state.idByBranchAndNodeId[branchId] ||= {};
                state.idByBranchAndNodeId[branchId][workflow.nodeId] = id;

                const data = {
                    initialInputIds: workflow.initialInputIds,
                    flows,
                    flowSteps,
                    inputOutputs,
                };
                state.workflowDiagramByBranchId[branchId] ||= {};
                state.workflowDiagramByBranchId[branchId][id] = buildWorkflowDiagram(data);
            })
            .addCase(createWorkflow.fulfilled, (state, action) => {
                const { workflow } = action.payload;
                const { id, branchId } = workflow;

                workflow.initialInputIds ||= [];
                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][id] = workflow;
                state.idByBranchAndNodeId[branchId] ||= {};
                state.idByBranchAndNodeId[branchId][workflow.nodeId] = id;

                state.workflowDiagramByBranchId[branchId] ||= {};
                state.workflowDiagramByBranchId[branchId][id] = buildWorkflowDiagram({
                    flows: [],
                    flowSteps: [],
                    inputOutputs: [],
                    initialInputIds: workflow.initialInputIds,
                });
            })
            .addCase(createWorkflow.rejected, (state, action) => {
                const workflow = action?.payload?.workflow;

                // existing workflow is returned
                if (workflow) {
                    const { id, branchId } = workflow;

                    workflow.initialInputIds ||= [];
                    state.byBranchId[branchId] ||= {};
                    state.byBranchId[branchId][id] = workflow;
                    state.idByBranchAndNodeId[branchId] ||= {};
                    state.idByBranchAndNodeId[branchId][workflow.nodeId] = id;

                    state.workflowDiagramByBranchId[branchId] ||= {};
                    state.workflowDiagramByBranchId[branchId][id]
                        = buildWorkflowDiagram({
                            flows: [],
                            flowSteps: [],
                            inputOutputs: [],
                            initialInputIds: workflow.initialInputIds,
                        });
                }
            })
            .addCase(deleteWorkflow.fulfilled, (state, action) => {
                const workflow = action.payload;
                const { id, branchId } = workflow;

                delete state.byBranchId[branchId][id];
                delete state.workflowDiagramByBranchId[branchId][id];
                state.idByBranchAndNodeId[branchId] ||= {};
                state.idByBranchAndNodeId[branchId][workflow.nodeId] = id;

                // TODO update app state
            })
            .addCase(deleteFlow.fulfilled, () => {
                // currently flows are deleted only from the pane
                // TODO update app state
            })
            .addCase(deleteFlowStep.fulfilled, (_, action) => {
                const flowStep = action.payload;
                const { outputIdsByNodeId } = flowStep;

                // check outputs
                if (!outputIdsByNodeId) return;
            })
            .addCase(updateWorkflowInitialInputs.fulfilled, (state, action) => {
                const workflow = action.payload;
                const { initialInputIds } = workflow;

                state.byBranchId[workflow.branchId][workflow.id].initialInputIds = initialInputIds;
            })
            .addCase(deleteIo.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const workflowId = inputOutput.workflowId as UUID;
                const branchId = inputOutput.branchId as UUID;
                const { initialInputIds } = state.byBranchId[branchId][workflowId];

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
    setWorkflowScale,
    updateWorkflow,
    rebuildWorkflowDiagram,
} = actions;

export default reducer;
