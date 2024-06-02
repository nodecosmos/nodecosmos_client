import {
    keepFlowStep,
    reloadBranch,
    restoreFlow,
    restoreFlowStep,
    restoreIo,
    restoreNode, showBranch,
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
import { createFlowStep, deleteFlowStep } from '../flow-steps/flowSteps.thunks';
import { createFlow, deleteFlow } from '../flows/flows.thunks';
import { createIo, deleteIo } from '../input-outputs/inputOutputs.thunks';
import {
    create, deleteNode, reorder, updateTitle,
} from '../nodes/nodes.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BranchesState = { byId: {} };

function initBranch(state: BranchesState, branch: Branch) {
    const { conflict } = branch;

    state.byId[branch.id] = {
        rootId: branch.rootId,
        nodeId: branch.nodeId,
        id: branch.id,
        title: branch.title,
        description: branch.description,
        ownerId: branch.ownerId,
        owner: branch.owner,
        status: branch.status,
        editorIds: new Set(branch.editorIds),
        isPublic: branch.isPublic,
        isContributionRequest: branch.isContributionRequest,
        createdNodes: new Set(branch.createdNodes),
        deletedNodes: new Set(branch.deletedNodes),
        restoredNodes: new Set(branch.restoredNodes),
        editedTitleNodes: new Set(branch.editedTitleNodes),
        editedDescriptionNodes: new Set(branch.editedDescriptionNodes),
        editedNodes: new Set(branch.editedNodes),
        createdInitialInputs: branch.createdInitialInputs || [],
        deletedInitialInputs: branch.deletedInitialInputs || [],
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
                const { branchId } = action.meta.arg;
                const branch = branchId && state.byId[branchId];

                if (branch) {
                    branch.createdNodes ||= new Set();
                    branch.createdNodes.add(nodeId);
                }
            })
            .addCase(deleteNode.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload.data;
                const { branchId } = action.meta.arg;
                const branch = branchId && state.byId[branchId];

                if (branch) {
                    branch.deletedNodes ||= new Set();
                    branch.deletedNodes.add(nodeId);
                }
            })
            .addCase(updateTitle.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { branchId } = action.meta.arg;
                const branch = branchId && state.byId[branchId];

                if (branch && !branch.createdNodes?.has(nodeId)) {
                    branch.editedTitleNodes ||= new Set();
                    branch.editedTitleNodes.add(nodeId);
                }
            })
            .addCase(reorder.fulfilled, (state, action) => {
                const {
                    id, branchId, newParentId, oldParentId, newSiblingIndexAfterMove,
                } = action.meta.arg;
                const branch = branchId && state.byId[branchId];

                if (branch) {
                    branch.reorderedNodes ||= [];
                    branch.reorderedNodes.push({
                        newParentId,
                        oldParentId,
                        id,
                        oldOrderIndex: 0,
                        newOrderIndex: newSiblingIndexAfterMove,
                    });
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
                    case ObjectType.FlowStep:
                        branch.editedDescriptionFlowSteps ||= new Set();
                        branch.editedDescriptionFlowSteps.add(objectId);
                        break;
                    case ObjectType.Io:
                        branch.editedDescriptionIos ||= new Set();
                        branch.editedDescriptionIos.add(objectId);
                        break;
                    }
                }
            })
            .addCase(createFlow.fulfilled, (state, action) => {
                const { id: flowId, branchId } = action.payload;
                const branch = state.byId[branchId];

                if (branch) {
                    branch.createdFlows ||= new Set();
                    branch.createdFlows.add(flowId);
                }
            })
            .addCase(deleteFlow.fulfilled, (state, action) => {
                const { id: flowId, branchId } = action.payload.data;
                const branch = state.byId[branchId];

                if (branch) {
                    branch.deletedFlows ||= new Set();
                    branch.deletedFlows.add(flowId);
                }
            })
            .addCase(createFlowStep.fulfilled, (state, action) => {
                const { id: flowStepId, branchId } = action.payload;
                const branch = state.byId[branchId];

                if (branch) {
                    branch.createdFlowSteps ||= new Set();
                    branch.createdFlowSteps.add(flowStepId);
                }
            })
            .addCase(deleteFlowStep.fulfilled, (state, action) => {
                const { id: flowStepId, branchId } = action.payload.data;
                const branch = state.byId[branchId];

                if (branch) {
                    branch.deletedFlowSteps ||= new Set();
                    branch.deletedFlowSteps.add(flowStepId);
                }
            })
            .addCase(createIo.fulfilled, (state, action) => {
                const { id: ioId, branchId } = action.payload;
                const branch = state.byId[branchId];

                if (branch) {
                    branch.createdIos ||= new Set();
                    branch.createdIos.add(ioId);
                }
            })
            .addCase(deleteIo.fulfilled, (state, action) => {
                const { id: ioId, branchId } = action.payload.data;
                const branch = state.byId[branchId];

                if (branch) {
                    branch.deletedIos ||= new Set();
                    branch.deletedIos.add(ioId);
                }
            })
            .addCase(showBranch.fulfilled, (state, action) => initBranch(state, action.payload))
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
