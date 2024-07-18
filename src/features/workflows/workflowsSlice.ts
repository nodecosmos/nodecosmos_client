import { buildWorkflowDiagram, BuildWorkflowDiagramData } from './diagram/diagram';
import { showWorkflow, updateWorkflowTitle } from './worfklow.thunks';
import { WorkflowState } from './workflow.types';
import { UUID } from '../../types';
import { createIo, deleteIo } from '../input-outputs/inputOutputs.thunks';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const WORKFLOW_SCALE_LS_KEY = 'WFS';

const parseScaleFromLS = () => {
    const scale = localStorage.getItem(WORKFLOW_SCALE_LS_KEY);

    if (scale) {
        return parseFloat(scale);
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    return isMobile ? 0.7 : 1;
};

const initialState: WorkflowState = {
    byBranchId: {},
    // diagram
    workflowDiagramByBranchId: {},
    workflowScale: parseScaleFromLS(),
};

const workflowsSlice = createSlice({
    name: 'workflows',
    initialState,
    reducers: {
        setWorkflowScale(state, action) {
            localStorage.setItem(WORKFLOW_SCALE_LS_KEY, action.payload);
            state.workflowScale = action.payload;
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
            .addCase(createIo.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const {
                    branchId, nodeId, initialInput,
                } = inputOutput;

                if (initialInput) {
                    state.byBranchId[branchId][nodeId].initialInputIds ||= [];
                    state.byBranchId[branchId][nodeId].initialInputIds.push(inputOutput.id);
                }
            })
            .addCase(deleteIo.fulfilled, (state, action) => {
                const inputOutput = action.payload;
                const { nodeId, id } = inputOutput.data;
                const { branchId } = action.meta.arg;
                const { initialInputIds } = state.byBranchId[branchId][nodeId];
                const { deleteFromState } = action.payload.metadata;

                if (deleteFromState) {
                    if (initialInputIds.includes(id as UUID)) {
                        state.byBranchId[branchId][nodeId].initialInputIds
                            = initialInputIds.filter((iid) => iid !== id);
                    }
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
    rebuildWorkflowDiagram,
} = actions;

export default reducer;
