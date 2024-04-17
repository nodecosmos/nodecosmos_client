import { SelectedObject } from './app.types';
import { RootState } from '../../store';
import { ObjectType } from '../../types';
import { BranchDiffPayload } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const selectObject = createAsyncThunk<
    SelectedObject,
    Pick<SelectedObject, 'objectId' | 'branchId' | 'objectNodeId' | 'objectType' | 'metadata'> & BranchDiffPayload,
    { state: RootState }
> (
    'app/selectObject',
    async (payload, { getState }) => {
        try {
            const state = getState();
            let objectTitle, originalObjectTitle;

            switch (payload.objectType) {
            case ObjectType.Node:
                objectTitle = state.nodes.byBranchId[payload.currentBranchId]?.[payload.objectId]?.title;
                originalObjectTitle = state.nodes.byBranchId[payload.currentRootId]?.[payload.objectId]?.title;
                break;

            case ObjectType.Workflow:
                objectTitle = state.workflows.byBranchId[payload.currentBranchId]?.[payload.objectId]?.title;
                originalObjectTitle = state.workflows.byBranchId[payload.currentRootId]?.[payload.objectId]?.title;
                break;

            case ObjectType.Flow:
                objectTitle = state.flows.byBranchId[payload.currentBranchId]?.[payload.objectId]?.title;
                originalObjectTitle = state.flows.byBranchId[payload.currentRootId]?.[payload.objectId]?.title;
                break;

            case ObjectType.FlowStep:
                originalObjectTitle = state.flowSteps.byBranchId[payload.currentBranchId]?.[payload.objectId]?.flowIndex
                    .toString();
                objectTitle = state.flowSteps.byBranchId[payload.currentRootId]?.[payload.objectId]?.flowIndex
                    .toString();
                break;

            case ObjectType.Io:
                originalObjectTitle = state.inputOutputs.byBranchId[payload.currentBranchId]?.[payload.objectId]?.title;
                objectTitle = state.inputOutputs.byBranchId[payload.currentRootId]?.[payload.objectId]?.title;
                break;

            default:
                throw new Error(`Unknown object type: ${payload.objectType}`);
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
