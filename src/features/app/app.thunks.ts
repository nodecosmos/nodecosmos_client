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

                case ObjectType.FlowStep:
                    originalObjectTitle = state.flowSteps.byBranchId[payload.branchId]?.[payload.objectId]?.stepIndex
                        .toString();
                    objectTitle = originalObjectTitle; // flow steps don't have titles
                    break;

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
