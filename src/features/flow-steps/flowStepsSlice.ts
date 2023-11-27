import { groupFlowStepsById } from './flowSteps.memoize';
import {
    createFlowStep, deleteFlowStep, updateFlowStepInputs, updateFlowStepNodes, updateFlowStepOutputs,
} from './flowSteps.thunks';
import { FlowStep, FlowStepState } from './types';
import { UUID } from '../../types';
import { deleteIO } from '../input-outputs/inputOutputs.thunks';
import { showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';

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
                const flowStepsById = groupFlowStepsById(flowSteps);

                state.byId = { ...state.byId, ...flowStepsById };
            })
            .addCase(createFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload;

                flowStep.inputIdsByNodeId ||= {};
                flowStep.outputIdsByNodeId ||= {};

                state.byId[flowStep.id] = flowStep;

                if (flowStep.prevFlowStepId) {
                    state.byId[flowStep.prevFlowStepId].nextFlowStepId = flowStep.id;
                }

                if (flowStep.nextFlowStepId) {
                    state.byId[flowStep.nextFlowStepId].prevFlowStepId = flowStep.id;
                }
            })
            .addCase(updateFlowStepNodes.fulfilled, (state, action) => {
                const flowStep = action.payload;

                state.byId[flowStep.id as UUID].nodeIds = flowStep.nodeIds as UUID[];
            })
            .addCase(updateFlowStepOutputs.fulfilled, (state, action) => {
                const flowStep = action.payload;

                state.byId[flowStep.id as UUID].outputIdsByNodeId
                    = flowStep.outputIdsByNodeId as FlowStep['outputIdsByNodeId'];
            })
            .addCase(updateFlowStepInputs.fulfilled, (state, action) => {
                const flowStep = action.payload;

                state.byId[flowStep.id as UUID].inputIdsByNodeId
                    = flowStep.inputIdsByNodeId as FlowStep['inputIdsByNodeId'];
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload;

                delete state.byId[flowStep.id as UUID];
            })
            .addCase(deleteIO.fulfilled, (state, action) => {
                const { flowStepId, id } = action.payload;

                if (!flowStepId) return;

                // remove from outputs of current step
                const flowStep = state.byId[flowStepId];
                const { outputIdsByNodeId } = flowStep;

                Object.keys(outputIdsByNodeId).forEach((nodeId) => {
                    state.byId[flowStepId].outputIdsByNodeId[nodeId] = outputIdsByNodeId[nodeId]
                        .filter((outputId) => outputId !== id);
                });
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
