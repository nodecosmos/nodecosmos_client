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
                    flowStep.stepIndex = new Decimal(flowStep.stepIndex);
                    state.byBranchId[branchId][flowStep.id] = flowStep;
                });
            })
            .addCase(createFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload;
                const { branchId } = flowStep;

                flowStep.inputIdsByNodeId ||= {};
                flowStep.outputIdsByNodeId ||= {};
                flowStep.stepIndex = new Decimal(flowStep.stepIndex);

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
                const flowStep = action.payload.data;
                const { deleteFromState } = action.payload.metadata;
                const { branchId } = flowStep;

                if (deleteFromState) {
                    delete state.byBranchId[branchId][flowStep.id];
                }
            })
            .addCase(deleteIo.fulfilled, (state, action) => {
                const { flowStepId, id } = action.payload.data;
                const { deleteFromState } = action.payload.metadata;
                const { branchId } = action.meta.arg;

                if (!flowStepId) return;

                // remove from outputs of current step
                const outputIdsByNodeId = state.byBranchId[branchId][flowStepId].outputIdsByNodeId;

                if (deleteFromState) {
                    Object.keys(outputIdsByNodeId).forEach((nodeId) => {
                        state.byBranchId[branchId][flowStepId].outputIdsByNodeId[nodeId]
                            = outputIdsByNodeId[nodeId].filter((outputId) => outputId !== id);
                    });
                }
            });
    },
});

const { reducer } = flowStepsSlice;

export default reducer;
