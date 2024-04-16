import {
    createFlowStep,
    deleteFlowStep,
    updateFlowStepInputs,
    updateFlowStepNodes,
    updateFlowStepOutputs,
} from './flowSteps.thunks';
import { FlowStep, FlowStepState } from './flowSteps.types';
import { UUID } from '../../types';
import { deleteIo } from '../input-outputs/inputOutputs.thunks';
import { showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';

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

                flowSteps.forEach((flowStep) => {
                    flowStep.branchId = branchId;
                    flowStep.flowIndex = new Decimal(flowStep.flowIndex);
                    state.byBranchId[branchId][flowStep.id] = flowStep;
                });
            })
            .addCase(createFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const { branchId } = flowStep;

                flowStep.inputIdsByNodeId ||= {};
                flowStep.outputIdsByNodeId ||= {};
                flowStep.flowIndex = new Decimal(flowStep.flowIndex);

                state.byBranchId[branchId] ||= {};
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
            .addCase(deleteIo.fulfilled, (state, action) => {
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

const { reducer } = flowStepsSlice;

export default reducer;
