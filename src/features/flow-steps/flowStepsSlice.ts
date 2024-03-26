import {
    createFlowStep,
    deleteFlowStep,
    updateFlowStepInputs,
    updateFlowStepNodes,
    updateFlowStepOutputs,
} from './flowSteps.thunks';
import { FlowStep, FlowStepState } from './flowSteps.types';
import { UUID } from '../../types';
import { deleteIO } from '../input-outputs/inputOutputs.thunks';
import { showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: FlowStepState = { byBranchId: {} };

const flowStepsSlice = createSlice({
    name: 'flowSteps',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(showWorkflow.fulfilled, (state, action) => {
                const { flowSteps, workflow } = action.payload;
                const { branchId } = workflow;

                state.byBranchId[branchId] ||= {};

                flowSteps.forEach((flowStep, index) => {
                    flowStep.branchId = branchId;
                    flowStep.index = index;
                    state.byBranchId[branchId][flowStep.id] = flowStep;
                });
            })
            .addCase(createFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const { branchId } = flowStep;

                flowStep.inputIdsByNodeId ||= {};
                flowStep.outputIdsByNodeId ||= {};

                state.byBranchId[branchId] ||= {};

                if (flowStep.prevFlowStepId) {
                    state.byBranchId[branchId][flowStep.prevFlowStepId].nextFlowStepId = flowStep.id;
                    flowStep.index = state.byBranchId[branchId][flowStep.prevFlowStepId].index + 1;
                } else {
                    flowStep.index = 0;
                }

                if (flowStep.nextFlowStepId) {
                    state.byBranchId[branchId][flowStep.nextFlowStepId].prevFlowStepId = flowStep.id;
                }

                state.byBranchId[branchId][flowStep.id] = flowStep;
            })
            .addCase(updateFlowStepNodes.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const {
                    branchId, id, nodeIds,
                } = flowStep;

                state.byBranchId[branchId][id].nodeIds = nodeIds || [];
            })
            .addCase(updateFlowStepOutputs.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const { branchId } = flowStep;

                state.byBranchId[branchId][flowStep.id as UUID].outputIdsByNodeId
                    = flowStep.outputIdsByNodeId as FlowStep['outputIdsByNodeId'];
            })
            .addCase(updateFlowStepInputs.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const { branchId } = flowStep;

                state.byBranchId[branchId][flowStep.id as UUID].inputIdsByNodeId
                    = flowStep.inputIdsByNodeId as FlowStep['inputIdsByNodeId'];
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const { branchId } = flowStep;

                delete state.byBranchId[branchId][flowStep.id as UUID];
            })
            .addCase(deleteIO.fulfilled, (state, action) => {
                const {
                    branchId, flowStepId, id,
                } = action.payload;

                if (!flowStepId) return;

                // remove from outputs of current step
                const flowStep = state.byBranchId[branchId][flowStepId];
                const { outputIdsByNodeId } = flowStep;

                Object.keys(outputIdsByNodeId).forEach((nodeId) => {
                    state.byBranchId[branchId][flowStepId].outputIdsByNodeId[nodeId] = outputIdsByNodeId[nodeId]
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
