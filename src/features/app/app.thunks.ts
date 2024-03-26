import { SelectedObject } from './app.types';
import { RootState } from '../../store';
import { ObjectType } from '../../types';
import { BranchDiffPayload } from '../branch/branches.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setPaneContent = createAsyncThunk<
    SelectedObject,
    Pick<SelectedObject, 'objectId' | 'branchId' | 'objectNodeId' | 'objectType' | 'metadata'> & BranchDiffPayload,
    { state: RootState }
> (
    'app/setPaneContent',
    async (payload, { getState }) => {
        const state = getState();
        let objectTitle, originalObjectTitle;

        switch (payload.objectType) {
        case ObjectType.Node:
            objectTitle = state.nodes.byBranchId[payload.currentRootNodeId][payload.objectId].title;
            originalObjectTitle = state.nodes.byBranchId[payload.currentBranchId][payload.objectId].title;
            break;

        case ObjectType.Workflow:
            objectTitle = state.workflows.byBranchId[payload.currentRootNodeId][payload.objectId].title;
            originalObjectTitle = state.workflows.byBranchId[payload.currentBranchId][payload.objectId].title;
            break;

        case ObjectType.Flow:
            objectTitle = state.flows.byBranchId[payload.currentRootNodeId][payload.objectId].title;
            originalObjectTitle = state.flows.byBranchId[payload.currentBranchId][payload.objectId].title;
            break;

        case ObjectType.FlowStep:
            objectTitle = state.flowSteps.byBranchId[payload.currentRootNodeId][payload.objectId].index
                .toString();
            originalObjectTitle = state.flowSteps.byBranchId[payload.currentRootNodeId][payload.objectId].index
                .toString();
            break;

        case ObjectType.IO:
            objectTitle = state.inputOutputs.byBranchId[payload.currentRootNodeId][payload.objectId].title;
            originalObjectTitle = state.inputOutputs.byBranchId[payload.currentBranchId][payload.objectId].title;
            break;
        }

        return {
            objectTitle,
            originalObjectTitle,
            objectId: payload.objectId,
            branchId: payload.branchId,
            objectNodeId: payload.objectNodeId,
            objectType: payload.objectType,
        };
    },
);
