import { createSlice } from '@reduxjs/toolkit';
import { showWorkflow } from '../workflows/workflows.thunks';
import {
    createFlow, deleteFlow, getFlowDescription, updateFlowTitle,
} from './flows.thunks';
import {
    Flow, FlowPaneContent, FlowState,
} from './types';

const initialState: FlowState = {
    byId: {},
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
            const { id } = action.payload;

            state.byId[id] = { ...state.byId[id], ...action.payload };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(createFlow.fulfilled, (state, action) => {
                const { flow } = action.payload;
                state.byId[flow.id] = flow;
            })
            .addCase(getFlowDescription.fulfilled, (state, action) => {
                const { flow } = action.payload;
                const { description, descriptionMarkdown } = flow;

                state.byId[flow.id].description = description;
                state.byId[flow.id].descriptionMarkdown = descriptionMarkdown;
            })
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const { flows } = action.payload;
                flows.forEach((flow: Flow) => {
                    state.byId[flow.id] = flow;
                });
            })
            .addCase(deleteFlow.fulfilled, (state, action) => {
                const { flow } = action.payload;

                delete state.byId[flow.id];
            })
            .addCase(updateFlowTitle.fulfilled, (state, action) => {
                const { flow } = action.payload;
                state.byId[flow.id].title = flow.title;
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
