import { buildWorkflowDiagram, BuildWorkflowDiagramData } from './diagram/diagram';
import {
    showWorkflow, updateWorkflowInitialInputs, updateWorkflowTitle,
} from './worfklow.thunks';
import { WorkflowState } from './workflow.types';
import { getScale } from './workflow.utils';
import { UUID } from '../../types';
import { deleteIo } from '../input-outputs/inputOutputs.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WorkflowState = {
    byBranchId: {},
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
            const workflow = state.byBranchId[action.payload.branchId][action.payload.nodeId];

            state.byBranchId[action.payload.branchId][action.payload.nodeId] = {
                ...workflow,
                ...action.payload,
            };
        },
        rebuildWorkflowDiagram(
            state,
            action: PayloadAction<{ nodeId: UUID, branchId: UUID, data: BuildWorkflowDiagramData }>,
        ) {
            const {
                nodeId, branchId, data,
            } = action.payload;

            state.workflowDiagramByBranchId[branchId][nodeId] = buildWorkflowDiagram(data);
        },
        clearWorkflowBranchData: (state, action: PayloadAction<UUID>) => {
            const branchId = action.payload;

            delete state.byBranchId[branchId];
            delete state.workflowDiagramByBranchId[branchId];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const {
                    workflow, flows, flowSteps, inputOutputs,
                } = action.payload;
                const { branchId, nodeId } = workflow;

                workflow.initialInputIds ||= [];
                workflow.initialInputIds = workflow.initialInputIds
                    .filter((value, index, array) => array.indexOf(value) === index);
                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][nodeId] = workflow;

                const data = {
                    initialInputIds: workflow.initialInputIds,
                    flows,
                    flowSteps,
                    inputOutputs,
                };
                state.workflowDiagramByBranchId[branchId] ||= {};
                state.workflowDiagramByBranchId[branchId][nodeId] = buildWorkflowDiagram(data);
            })
            .addCase(updateWorkflowTitle.fulfilled, (state, action) => {
                const workflow = action.payload;
                const { branchId, nodeId } = workflow;

                state.byBranchId[branchId][nodeId].title = workflow.title;
            })
            .addCase(updateWorkflowInitialInputs.fulfilled, (state, action) => {
                const workflow = action.payload;
                const { initialInputIds } = workflow;

                state.byBranchId[workflow.branchId][workflow.nodeId].initialInputIds = initialInputIds;
            })
            .addCase(deleteIo.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const { nodeId, id } = inputOutput.data;
                const { currentBranchId } = action.meta.arg;
                const { initialInputIds } = state.byBranchId[currentBranchId][nodeId];

                if (initialInputIds.includes(id as UUID)) {
                    state.byBranchId[currentBranchId][nodeId].initialInputIds
                        = initialInputIds.filter((iid) => iid !== id);
                }
            });
    },
});

const {
    actions,
    reducer,
} = workflowsSlice;

export const {
    clearWorkflowBranchData,
    setWorkflowScale,
    updateWorkflow,
    rebuildWorkflowDiagram,
} = actions;

export default reducer;
