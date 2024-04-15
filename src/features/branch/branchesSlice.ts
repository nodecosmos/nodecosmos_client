import {
    keepFlowStep,
    reloadBranch,
    restoreFlow,
    restoreFlowStep,
    restoreIo,
    restoreNode,
    undoDeleteFlow,
    undoDeleteFlowStep, undoDeleteIo,
    undoDeleteNode,
} from './branches.thunks';
import { Branch, BranchesState } from './branches.types';
import { ObjectType } from '../../types';
import { deepArrayToSet } from '../../utils/object';
import {
    mergeContributionRequest,
    showContributionRequest,
} from '../contribution-requests/contributionRequests.thunks';
import { saveDescription } from '../descriptions/descriptions.thunks';
import {
    create, deleteNode, updateTitle,
} from '../nodes/nodes.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BranchesState = { byId: {} };

function initBranch(state: BranchesState, branch: Branch) {
    const { conflict } = branch;

    state.byId[branch.id] = {
        id: branch.id,
        title: branch.title,
        description: branch.description,
        ownerId: branch.ownerId,
        owner: branch.owner,
        status: branch.status,
        editorIds: branch.editorIds,
        isPublic: branch.isPublic,
        isContributionRequest: branch.isContributionRequest,
        createdNodes: new Set(branch.createdNodes),
        deletedNodes: new Set(branch.deletedNodes),
        restoredNodes: new Set(branch.restoredNodes),
        editedTitleNodes: new Set(branch.editedTitleNodes),
        editedDescriptionNodes: new Set(branch.editedDescriptionNodes),
        editedWorkflowNodes: new Set(branch.editedWorkflowNodes),
        createdWorkflowInitialInputs: deepArrayToSet(branch.createdWorkflowInitialInputs),
        deletedWorkflowInitialInputs: deepArrayToSet(branch.deletedWorkflowInitialInputs),
        reorderedNodes: branch.reorderedNodes || [],
        createdFlows: new Set(branch.createdFlows),
        deletedFlows: new Set(branch.deletedFlows),
        restoredFlows: new Set(branch.restoredFlows),
        editedTitleFlows: new Set(branch.editedTitleFlows),
        editedDescriptionFlows: new Set(branch.editedDescriptionFlows),
        createdFlowSteps: new Set(branch.createdFlowSteps),
        deletedFlowSteps: new Set(branch.deletedFlowSteps),
        restoredFlowSteps: new Set(branch.restoredFlowSteps),
        keptFlowSteps: new Set(branch.keptFlowSteps),
        createdFlowStepNodes: deepArrayToSet(branch.createdFlowStepNodes),
        deletedFlowStepNodes: deepArrayToSet(branch.deletedFlowStepNodes),
        createdFlowStepInputsByNode: deepArrayToSet(branch.createdFlowStepInputsByNode),
        deletedFlowStepInputsByNode: deepArrayToSet(branch.deletedFlowStepInputsByNode),
        createdFlowStepOutputsByNode: deepArrayToSet(branch.createdFlowStepOutputsByNode),
        deletedFlowStepOutputsByNode: deepArrayToSet(branch.deletedFlowStepOutputsByNode),
        editedDescriptionFlowSteps: new Set(branch.editedDescriptionFlowSteps),
        createdIos: new Set(branch.createdIos),
        deletedIos: new Set(branch.deletedIos),
        restoredIos: new Set(branch.restoredIos),
        editedTitleIos: new Set(branch.editedTitleIos),
        editedDescriptionIos: new Set(branch.editedDescriptionIos),
        descriptionChangeByObject: branch.descriptionChangeByObject || {},
        titleChangeByObject: branch.titleChangeByObject,
        conflict: conflict && {
            status: conflict.status,
            deletedAncestors: new Set(conflict.deletedAncestors),
            deletedEditedNodes: new Set(conflict.deletedEditedNodes),
            deletedEditedFlows: new Set(conflict.deletedEditedFlows),
            deletedEditedFlowSteps: new Set(conflict.deletedEditedFlowSteps),
            deletedEditedIos: new Set(conflict.deletedEditedIos),
            conflictingFlowSteps: new Set(conflict.conflictingFlowSteps),
        },
    };
}

const branchesSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(showContributionRequest.fulfilled, (state, action) => {
                const { branch } = action.payload;

                if (branch) {
                    initBranch(state, branch);
                }
            })
            .addCase(create.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.createdNodes ||= new Set();
                    branch.createdNodes.add(nodeId);
                }
            })
            .addCase(deleteNode.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.deletedNodes ||= new Set();
                    branch.deletedNodes.add(nodeId);
                }
            })
            .addCase(updateTitle.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.editedTitleNodes ||= new Set();
                    branch.editedTitleNodes.add(nodeId);
                }
            })
            .addCase(saveDescription.fulfilled, (state, action) => {
                const {
                    branchId, objectId, objectType,
                } = action.payload;
                const branch = state.byId[branchId];

                if (branch) {
                    switch (objectType) {
                    case ObjectType.Node: {
                        branch.editedDescriptionNodes ||= new Set();
                        branch.editedDescriptionNodes.add(objectId);
                        break;
                    }
                    case ObjectType.Flow:
                        branch.editedDescriptionFlows ||= new Set();
                        branch.editedDescriptionFlows.add(objectId);
                        break;
                    case ObjectType.Io:
                        branch.editedDescriptionIos ||= new Set();
                        branch.editedDescriptionIos.add(objectId);
                        break;
                    }
                }
            })
            .addCase(restoreNode.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(undoDeleteNode.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(restoreFlow.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(undoDeleteFlow.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(restoreFlowStep.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(undoDeleteFlowStep.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(keepFlowStep.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(reloadBranch.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(restoreIo.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(undoDeleteIo.fulfilled, (state, action) => initBranch(state, action.payload))
            .addCase(mergeContributionRequest.rejected, (state, action) => {
                const branch = action.payload?.branch;

                if (branch) {
                    initBranch(state, branch);
                }
            });
    },
});

const { reducer } = branchesSlice;

export default reducer;
