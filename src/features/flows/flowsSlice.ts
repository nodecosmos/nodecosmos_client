import {
    createFlow, deleteFlow, getFlowDescription, updateFlowTitle,
} from './flows.thunks';
import {
    Flow, FlowPaneContent, FlowState,
} from './types';
import { UUID } from '../../types';
import { showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';

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
                const flow = action.payload;
                state.byId[flow.id] = flow;
            })
            .addCase(getFlowDescription.fulfilled, (state, action) => {
                const flow = action.payload;
                const { description, descriptionMarkdown } = flow;

                state.byId[flow.id as UUID].description = description as string | null;
                state.byId[flow.id as UUID].descriptionMarkdown = descriptionMarkdown as string | null;
            })
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const { flows } = action.payload;
                flows.forEach((flow: Flow) => {
                    state.byId[flow.id] = flow;
                });
            })
            .addCase(deleteFlow.fulfilled, (state, action) => {
                const flow = action.payload;

                delete state.byId[flow.id as UUID];
            })
            .addCase(updateFlowTitle.fulfilled, (state, action) => {
                const flow = action.payload;
                state.byId[flow.id as UUID].title = flow.title as string;
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
