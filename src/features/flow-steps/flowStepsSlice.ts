import { createSlice } from '@reduxjs/toolkit';
import { deleteIO } from '../input-outputs/inputOutputs.thunks';
import { showWorkflow } from '../workflows/workflows.thunks';
import {
    createFlowStep, deleteFlowStep, updateFlowStepInputs, updateFlowStepNodes, updateFlowStepOutputs,
} from './flowSteps.thunks';
import { FlowStep, FlowStepState } from './types';

const initialState: FlowStepState = {
    byId: {},
};

const flowStepsSlice = createSlice({
    name: 'flowSteps',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const { flowSteps } = action.payload;
                flowSteps.forEach((flowStep: FlowStep) => {
                    state.byId[flowStep.id] = flowStep;

                    flowStep.inputIdsByNodeId ||= {};
                    flowStep.outputIdsByNodeId ||= {};
                });
            })
            .addCase(createFlowStep.fulfilled, (state, action) => {
                const { flowStep } = action.payload;

                flowStep.inputIdsByNodeId ||= {};
                flowStep.outputIdsByNodeId ||= {};

                state.byId[flowStep.id] = flowStep;
            })
            .addCase(updateFlowStepNodes.fulfilled, (state, action) => {
                const { flowStep } = action.payload;

                state.byId[flowStep.id].nodeIds = flowStep.nodeIds;
            })
            .addCase(updateFlowStepOutputs.fulfilled, (state, action) => {
                const { flowStep } = action.payload;

                state.byId[flowStep.id].outputIdsByNodeId = flowStep.outputIdsByNodeId;
            })
            .addCase(updateFlowStepInputs.fulfilled, (state, action) => {
                const { flowStep } = action.payload;

                state.byId[flowStep.id].inputIdsByNodeId = flowStep.inputIdsByNodeId;
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const { flowStep } = action.payload;

                delete state.byId[flowStep.id];
            })
            .addCase(deleteIO.fulfilled, (state, action) => {
                const { flowStepId, id } = action.payload.inputOutput;

                if (!flowStepId) return;

                // remove from outputs of current step
                const flowStep = state.byId[flowStepId];

                Object.keys(flowStep.outputIdsByNodeId).forEach((nodeId) => {
                    flowStep.outputIdsByNodeId[nodeId] = flowStep.outputIdsByNodeId[nodeId]
                        .filter((outputId) => outputId !== id);
                });

                state.byId[flowStepId] = flowStep;
            });
    },
});

const {
    actions,
    reducer,
} = flowStepsSlice;

// eslint-disable-next-line no-empty-pattern
export const {} = actions;

export default reducer;
