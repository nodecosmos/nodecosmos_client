import {
    FlowStep,
    FlowStepCreationParams, FlowStepPrimaryKey, FlowStepUpdatePayload,
} from './flowSteps.types';
import nodecosmos from '../../api/nodecosmos-server';
import { RootState } from '../../store';
import {
    NodecosmosError, RootId, UUID,
} from '../../types';
import { BranchMetadata, WithBranchMetadata } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createFlowStep = createAsyncThunk<
    FlowStep,
    FlowStepCreationParams,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/createFlowStep',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await nodecosmos.post('/flow_steps', payload);
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while creating the flow step.',
                viewMessage: true,
            });
        }
    },
);

export const updateFlowStepNodes = createAsyncThunk<
    Partial<FlowStep> & FlowStepPrimaryKey,
    FlowStepUpdatePayload,
    { rejectValue: NodecosmosError }
>(
    'flow_steps/updateFlowStepNodes',
    async (payload) => {
        const response = await nodecosmos.put('/flow_steps/nodes', payload);

        return response.data;
    },
);

export const updateFlowStepInputs = createAsyncThunk<
        {
            flowStep: Partial<FlowStep> & FlowStepPrimaryKey,
            createdDiff: Record<UUID, UUID[]>,
            removedDiff: Record<UUID, UUID[]>,
        },
    FlowStepUpdatePayload,
    { rejectValue: NodecosmosError, state: RootState }
>(
    'flow_steps/updateFlowStepInputs',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const response = await nodecosmos.put('/flow_steps/inputs', payload);
            const state = getState();
            const {
                branchId, id, inputIdsByNodeId: newInputsByNodeId = {},
            } = response.data;
            const flowStep = state.flowSteps.byBranchId[branchId][id];
            const branch = state.branches.byId[branchId];
            const { inputIdsByNodeId: currentInputIdsByNodeId } = flowStep;
            const createdDiff: Record<UUID, UUID[]> = {};
            const removedDiff: Record<UUID, UUID[]> = {};

            if (branch) {
                const branchDeletedFlowStepInputsByNode = branch.deletedFlowStepInputsByNode?.[id];
                Object.keys(newInputsByNodeId).forEach((nodeId: UUID) => {
                    if (currentInputIdsByNodeId[nodeId]) {
                        const currentInputIds = currentInputIdsByNodeId[nodeId];
                        const newInputIds = newInputsByNodeId[nodeId];
                        const createdNodeInputs = newInputIds.filter(
                            (id: UUID) => !currentInputIds.includes(id)
                                || branchDeletedFlowStepInputsByNode?.[nodeId]?.has(id),
                        );
                        const removedNodeInputs = currentInputIds.filter(
                            (id: UUID) => !newInputIds.includes(id)
                                && !branchDeletedFlowStepInputsByNode?.[nodeId]?.has(id),
                        );

                        if (createdNodeInputs.length) {
                            createdDiff[nodeId] = createdNodeInputs;
                        }

                        if (removedNodeInputs.length) {
                            removedDiff[nodeId] = removedNodeInputs;
                        }
                    } else {
                        createdDiff[nodeId] = newInputsByNodeId[nodeId];
                    }
                });

                Object.keys(currentInputIdsByNodeId).forEach((nodeId) => {
                    if (!newInputsByNodeId[nodeId] && branch) {
                        removedDiff[nodeId] = currentInputIdsByNodeId[nodeId].filter(
                            (id: UUID) => !branchDeletedFlowStepInputsByNode?.[nodeId]?.has(id),
                        );
                    }
                });
            }

            return {
                flowStep: response.data,
                createdDiff,
                removedDiff,
            };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while updating the flow step inputs.',
                viewMessage: true,
            });
        }
    },
);

export const deleteFlowStep = createAsyncThunk<
    WithBranchMetadata<Partial<FlowStep> & FlowStepPrimaryKey>,
    FlowStepPrimaryKey & RootId,
    { state: RootState, rejectValue: NodecosmosError }
>(
    'flowSteps/deleteFlowStep',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const { branchId, id } = payload;
            // we use post as stepIndex is double that can't be passed in url
            const response = await nodecosmos.post('/flow_steps/delete', payload);

            const metadata: BranchMetadata = {};
            const state = getState();
            const branch = state.branches.byId[branchId];

            if (branch) {
                metadata.deleteFromState = branch.createdFlowSteps.has(id) || branch.restoredFlowSteps.has(id);
            } else {
                metadata.deleteFromState = true;
            }

            return {
                data: response.data,
                metadata,
            };
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data);
            }

            console.error(error);

            return rejectWithValue({
                status: 500,
                message: 'An error occurred while deleting the flow step.',
                viewMessage: true,
            });
        }
    },
);
