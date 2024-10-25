import {
    createFlowStep,
    deleteFlowStep,
    updateFlowStepInputs,
    updateFlowStepNodes,
} from './flowSteps.thunks';
import { FlowStepState } from './flowSteps.types';
import { UUID } from '../../types';
import { createIo, deleteIo } from '../input-outputs/inputOutputs.thunks';
import { indexWorkflowBranchData, showWorkflow } from '../workflows/worfklow.thunks';
import { createSlice } from '@reduxjs/toolkit';
import Decimal from 'decimal.js';

const initialState: FlowStepState = { byBranchId: {} };

const flowStepsSlice = createSlice({
    name: 'flowSteps',
    initialState,
    reducers: {
        clearFlowStepBranchData: (state, action) => {
            const branchId = action.payload;

            delete state.byBranchId[branchId];
        },
    },
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

                const { branch } = action.payload;

                if (!branch) return;

                if (Object.keys(branch.deletedFlowStepInputsByNode).length > 0) {
                    Object.keys(branch.deletedFlowStepInputsByNode).forEach((flowStepId) => {
                        const inputIdsByNodeIds = branch.deletedFlowStepInputsByNode[flowStepId];
                        Object.keys(inputIdsByNodeIds).forEach((nodeId) => {
                            const inputIds = inputIdsByNodeIds[nodeId];
                            state.byBranchId[branch.id][flowStepId].inputIdsByNodeId ||= {};
                            state.byBranchId[branch.id][flowStepId].inputIdsByNodeId[nodeId] ||= [];
                            state.byBranchId[branch.id][flowStepId].inputIdsByNodeId[nodeId]
                                = [...state.byBranchId[branch.id][flowStepId].inputIdsByNodeId[nodeId], ...inputIds];
                        });
                    });
                }
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
            .addCase(updateFlowStepInputs.fulfilled, (state, action) => {
                const {
                    flowStep, createdDiff, removedDiff,
                } = action.payload;
                const {
                    branchId, rootId, inputIdsByNodeId = {},
                } = flowStep;
                const isBranch = rootId !== branchId;

                if (isBranch && rootId) {
                    Object.keys(createdDiff).forEach((nodeId: UUID) => {
                        const createdNodeInputs = createdDiff[nodeId];

                        createdNodeInputs.forEach((inputId: UUID) => {
                            state.byBranchId[branchId][flowStep.id].inputIdsByNodeId ||= {};
                            state.byBranchId[branchId][flowStep.id].inputIdsByNodeId[nodeId] ||= [];

                            if (!state.byBranchId[branchId][flowStep.id].inputIdsByNodeId[nodeId].includes(inputId)) {
                                state.byBranchId[branchId][flowStep.id].inputIdsByNodeId[nodeId].push(inputId);
                            }
                        });
                    });

                    Object.keys(removedDiff).forEach((nodeId: UUID) => {
                        const removedNodeInputs = removedDiff[nodeId];
                        const currentNodeInputs = state.byBranchId[branchId][flowStep.id].inputIdsByNodeId[nodeId];
                        const originalNodeInputs = state.byBranchId[rootId]?.[flowStep.id]?.inputIdsByNodeId?.[nodeId];

                        if (!currentNodeInputs) return;

                        // remove inputs from state that were created in the branch
                        // leave inputs that are present in original node inputs as they will be marked as removed in ui
                        state.byBranchId[branchId][flowStep.id].inputIdsByNodeId[nodeId] = currentNodeInputs.filter(
                            (inputId) => {
                                return !removedNodeInputs.includes(inputId)
                                    || (originalNodeInputs && originalNodeInputs.includes(inputId));
                            },
                        );
                    });
                } else {
                    state.byBranchId[branchId][flowStep.id as UUID].inputIdsByNodeId = inputIdsByNodeId;
                }
            })
            .addCase(createIo.fulfilled, (state, action) => {
                const {
                    flowStepId, flowStepNodeId, id,
                } = action.payload;

                if (!flowStepId || !flowStepNodeId) return;

                const { branchId } = action.meta.arg;
                state.byBranchId[branchId][flowStepId].outputIdsByNodeId ||= {};
                const currentNodeOutputs = state.byBranchId[branchId][flowStepId].outputIdsByNodeId[flowStepNodeId]
                    || [];

                state.byBranchId[branchId][flowStepId].outputIdsByNodeId[flowStepNodeId]
                    = [...currentNodeOutputs, id];
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
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const flowStep = action.payload.data;
                const { deleteFromState } = action.payload.metadata;
                const { branchId } = flowStep;

                if (deleteFromState) {
                    delete state.byBranchId[branchId][flowStep.id];
                }
            })
            .addCase(indexWorkflowBranchData.fulfilled, (state, action) => {
                const { flowSteps } = action.payload;
                const { branchId } = action.meta.arg;

                state.byBranchId[branchId] ||= {};

                flowSteps.forEach((flowStep) => {
                    flowStep.branchId = branchId;
                    flowStep.stepIndex = new Decimal(flowStep.stepIndex);
                    state.byBranchId[branchId][flowStep.id] ||= flowStep;
                });
            });
    },
});

const { actions, reducer } = flowStepsSlice;

export const { clearFlowStepBranchData } = actions;

export default reducer;
