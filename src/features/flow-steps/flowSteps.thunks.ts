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
    {
        flowStep: Partial<FlowStep> & FlowStepPrimaryKey,
        createdDiff: Record<UUID, UUID[]>,
        removedDiff: Record<UUID, UUID[]>,
    },
    FlowStepUpdatePayload,
    { rejectValue: NodecosmosError, state: RootState }
>(
    'flow_steps/updateFlowStepNodes',
    async (payload, { rejectWithValue, getState }) => {
        try {
            const response = await nodecosmos.put('/flow_steps/nodes', payload);
            const state = getState();
            const {
                branchId, id, nodeIds: newNodes = [],
            } = payload;

            const flowStep = state.flowSteps.byBranchId[branchId][id];
            const branch = state.branches.byId[branchId];
            const { nodeIds: currentNodes } = flowStep;

            const createdDiff: Record<UUID, UUID[]> = {};
            const removedDiff: Record<UUID, UUID[]> = {};

            // we remove from state if node is created on the branch and then removed
            if (branch) {
                const branchDeletedFlowStepNodes = branch.deletedFlowStepNodes?.[id];
                newNodes.forEach((nodeId: UUID) => {
                    if (currentNodes && currentNodes.includes(nodeId)) {
                        const createdNode = !currentNodes.includes(nodeId)
                            || branchDeletedFlowStepNodes?.has(nodeId);

                        if (createdNode) {
                            createdDiff[nodeId] = [nodeId];
                        }
                    } else {
                        createdDiff[nodeId] = [nodeId];
                    }
                });

                currentNodes?.forEach((nodeId) => {
                    if (!newNodes.includes(nodeId)) {
                        removedDiff[nodeId] = [nodeId];
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
                message: 'An error occurred while updating the flow step nodes.',
                viewMessage: true,
            });
        }
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
            } = payload;
            const flowStep = state.flowSteps.byBranchId[branchId][id];
            const branch = state.branches.byId[branchId];
            const { inputIdsByNodeId: currentInputIdsByNodeId } = flowStep;
            const createdDiff: Record<UUID, UUID[]> = {};
            const removedDiff: Record<UUID, UUID[]> = {};
            // we remove from state if input is created on the branch and then removed

            if (branch) {
                const branchDeletedFlowStepInputsByNode = branch.deletedFlowStepInputsByNode?.[id];
                Object.keys(newInputsByNodeId).forEach((nodeId: UUID) => {
                    if (currentInputIdsByNodeId?.[nodeId]) {
                        const currentInputIds = currentInputIdsByNodeId[nodeId];
                        const newInputIds = newInputsByNodeId[nodeId];
                        const createdNodeInputs = newInputIds.filter(
                            (id: UUID) => !currentInputIds.includes(id)
                                || branchDeletedFlowStepInputsByNode?.[nodeId]?.has(id),
                        );
                        const removedNodeInputs = currentInputIds.filter(
                            (id: UUID) => !newInputIds.includes(id),
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

                if (currentInputIdsByNodeId) {
                    Object.keys(currentInputIdsByNodeId).forEach((nodeId) => {
                        if (!newInputsByNodeId[nodeId]) {
                            removedDiff[nodeId] = currentInputIdsByNodeId[nodeId].filter(
                                (id: UUID) => !branchDeletedFlowStepInputsByNode?.[nodeId]?.has(id),
                            );
                        }
                    });
                }
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
