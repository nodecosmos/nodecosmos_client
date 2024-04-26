import {
    createFlow, deleteFlow, updateFlowTitle,
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
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createFlow.fulfilled, (state, action) => {
                const flow = action.payload;
                const { branchId } = flow;

                state.byBranchId[branchId] ||= {};
                state.byBranchId[branchId][flow.id] = flow;
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
                const { branchId, id } = flow.data;
                const { deleteFromState } = flow.metadata;

                if (deleteFromState) {
                    delete state.byBranchId[branchId][id];
                }
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

const { reducer } = flowStepsSlice;

export default reducer;
