import { SelectedObject } from './app.types';
import { RootState } from '../../store';
import { ObjectType } from '../../types';
import { BranchDiffPayload, BranchStatus } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const selectObject = createAsyncThunk<
    SelectedObject,
    Omit<SelectedObject, 'objectTitle' | 'originalObjectTitle'> & BranchDiffPayload,
    { state: RootState }
> (
    'app/selectObject',
    async (payload, { getState }) => {
        try {
            const state = getState();
            let objectTitle, originalObjectTitle;
            const branch = state.branches.byId[payload.branchId];

            if (branch && branch.status === BranchStatus.Merged && branch.titleChangeByObject?.[payload.objectId]) {
                objectTitle = branch.titleChangeByObject[payload.objectId].new;
                originalObjectTitle = branch.titleChangeByObject[payload.objectId].old;
            } else {
                switch (payload.objectType) {
                case ObjectType.Node:
                    objectTitle = state.nodes.byBranchId[payload.branchId]?.[payload.objectId]?.title;
                    originalObjectTitle
                        = state.nodes.byBranchId[payload.originalId]?.[payload.objectId]?.title;
                    break;

                case ObjectType.Workflow:
                    objectTitle = state.workflows.byBranchId[payload.branchId]?.[payload.objectId]?.title;
                    originalObjectTitle
                        = state.workflows.byBranchId[payload.originalId]?.[payload.objectId]?.title;
                    break;

                case ObjectType.Flow:
                    objectTitle = state.flows.byBranchId[payload.branchId]?.[payload.objectId]?.title;
                    originalObjectTitle
                        = state.flows.byBranchId[payload.originalId]?.[payload.objectId]?.title;
                    break;

                case ObjectType.FlowStep: {
                    const { flowStepIndex, flowId } = payload.metadata || {};

                    if (!flowStepIndex || !flowId) {
                        throw new Error('Flow Step Index or Flow ID is missing in metadata');
                    }

                    const flowTitle = state.flows.byBranchId[payload.branchId]?.[flowId]?.title;
                    originalObjectTitle = `${flowTitle} (${flowStepIndex})`;
                    objectTitle = originalObjectTitle; // flow steps don't have titles
                    break;
                }
                case ObjectType.Io:
                    objectTitle = state.inputOutputs.byBranchId[payload.branchId]?.[payload.objectId]?.title;
                    originalObjectTitle
                        = state.inputOutputs.byBranchId[payload.originalId]?.[payload.objectId]?.title;
                    break;

                default:
                    throw new Error(`Unknown object type: ${payload.objectType}`);
                }
            }

            return {
                objectTitle,
                originalObjectTitle,
                ...payload,
            };
        } catch (error) {
            console.error('Error selecting object:', error);
            throw error;
        }
    },
);

export const clearSelectedObject = createAsyncThunk<
    SelectedObject | null,
    undefined,
    { state: RootState }
>(
    'app/clearSelectedObject',
    async (_, { getState }) => {
        try {
            const state = getState();
            return state.app.selectedObject;
        } catch (error) {
            console.error('Error clearing selected object:', error);
            throw error;
        }
    },
);
