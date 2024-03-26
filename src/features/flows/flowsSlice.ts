import {
    createFlow, deleteFlow, getFlowDescription, updateFlowTitle,
} from './flows.thunks';
import {
    Flow, FlowPaneContent, FlowState,
} from './flows.types';
import { showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: FlowState = {
    byBranchId: {},
    flowPaneContent: FlowPaneContent.Description,
};

const flowStepsSlice = createSlice({
    name: 'flows',
    initialState,
    reducers: {
        setFlowPaneContent(state, action) {
            state.flowPaneContent = action.payload;
        },
        updateFlowState(state, action) {
            const { branchId, id } = action.payload;
            state.byBranchId[branchId][id] = {
                ...state.byBranchId[branchId][id],
                ...action.payload,
            };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createFlow.fulfilled, (state, action) => {
                const flow = action.payload;
                const { branchId } = flow;

                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][flow.id] = flow;
            })
            .addCase(getFlowDescription.fulfilled, (state, action) => {
                const flow = action.payload;
                const {
                    branchId, id, description, descriptionMarkdown,
                } = flow;

                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][id].description = description as string | null;
                state.byBranchId[branchId][id].descriptionMarkdown = descriptionMarkdown as string | null;
            })
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const { flows, workflow } = action.payload;
                const { branchId } = workflow;
                state.byBranchId[branchId] ||= {};

                flows.forEach((flow: Flow) => {
                    flow.branchId = branchId;

                    state.byBranchId[branchId][flow.id] = flow;
                });
            })
            .addCase(deleteFlow.fulfilled, (state, action) => {
                const flow = action.payload;
                const { branchId, id } = flow;

                delete state.byBranchId[branchId][id];
            })
            .addCase(updateFlowTitle.fulfilled, (state, action) => {
                const flow = action.payload;
                const {
                    branchId, id, title,
                } = flow;

                state.byBranchId[branchId][id].title = title as string;
            });
    },
});

const {
    actions,
    reducer,
} = flowStepsSlice;

export const {
    setFlowPaneContent,
    updateFlowState,
} = actions;

export default reducer;
