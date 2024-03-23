import {
    checkDeletedAncestorConflict, restoreNode, undoDeleteNode,
} from './branches.thunks';
import {
    Branch, BranchesState, ConflictStatus,
} from './branches.types';
import { deepArrayToSet } from '../../utils/object';
import {
    mergeContributionRequest,
    showContributionRequest,
} from '../contribution-requests/contributionRequests.thunks';
import {
    create, deleteNode, updateDescription, updateTitle,
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
        isContributionRequest: branch.isContributionRequest,
        titleChangeByObject: branch.titleChangeByObject,
        descriptionChangeByObject: branch.descriptionChangeByObject || {},
        createdNodes: new Set(branch.createdNodes),
        deletedNodes: new Set(branch.deletedNodes),
        restoredNodes: new Set(branch.restoredNodes),
        editedNodeTitles: new Set(branch.editedNodeTitles),
        editedNodeDescriptions: new Set(branch.editedNodeDescriptions),
        reorderedNodes: branch.reorderedNodes || [],
        createdWorkflows: new Set(branch.createdWorkflows),
        deletedWorkflows: new Set(branch.deletedWorkflows),
        editedWorkflowTitles: new Set(branch.editedWorkflowTitles),
        createdFlows: new Set(branch.createdFlows),
        deletedFlows: new Set(branch.deletedFlows),
        editedFlowTitles: new Set(branch.editedFlowTitles),
        editedFlowDescriptions: new Set(branch.editedFlowDescriptions),
        createdIOs: new Set(branch.createdIOs),
        deletedIOs: new Set(branch.deletedIOs),
        editedIOTitles: new Set(branch.editedIOTitles),
        editedIODescriptions: new Set(branch.editedIODescriptions),
        createdFlowSteps: new Set(branch.createdFlowSteps),
        deletedFlowSteps: new Set(branch.deletedFlowSteps),
        createdFlowStepNodes: deepArrayToSet(branch.createdFlowStepNodes),
        deletedFlowStepNodes: deepArrayToSet(branch.deletedFlowStepNodes),
        createdFlowStepInputsByNode: deepArrayToSet(branch.createdFlowStepInputsByNode),
        deletedFlowStepInputsByNode: deepArrayToSet(branch.deletedFlowStepInputsByNode),
        createdFlowStepOutputsByNode: deepArrayToSet(branch.createdFlowStepOutputsByNode),
        deletedFlowStepOutputsByNode: deepArrayToSet(branch.deletedFlowStepOutputsByNode),
        conflict: conflict && {
            status: conflict.status,
            deletedAncestors: new Set(conflict.deletedAncestors),
            deletedEditedNodes: new Set(conflict.deletedEditedNodes),
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
                    branch.editedNodeTitles ||= new Set();
                    branch.editedNodeTitles.add(nodeId);
                }
            })
            .addCase(updateDescription.fulfilled, (state, action) => {
                const { id: nodeId } = action.payload;
                const { treeBranchId } = action.meta.arg;
                const branch = treeBranchId && state.byId[treeBranchId];

                if (branch) {
                    branch.editedNodeDescriptions ||= new Set();
                    branch.editedNodeDescriptions.add(nodeId);
                }
            })
            .addCase(restoreNode.fulfilled, (state, action) => {
                const branch = action.payload;

                initBranch(state, branch);
            })
            .addCase(undoDeleteNode.fulfilled, (state, action) => {
                const branch = action.payload;

                initBranch(state, branch);
            })
            .addCase(checkDeletedAncestorConflict.fulfilled, (state, action) => {
                const { branchId } = action.meta.arg;
                const deletedAncestors = action.payload;
                const branch = state.byId[branchId];
                const hasNewConflicts = !!deletedAncestors?.size;

                if (!branch) {
                    return;
                }

                if (branch.conflict && hasNewConflicts) {
                    branch.conflict.status = ConflictStatus.Pending;
                    branch.conflict.deletedAncestors = deletedAncestors;
                } else if (!branch.conflict && hasNewConflicts) {
                    branch.conflict = {
                        status: ConflictStatus.Pending,
                        deletedAncestors,
                        deletedEditedNodes: new Set(),
                    };
                } else if (branch.conflict && !hasNewConflicts) {
                    branch.conflict.status = ConflictStatus.Resolved;
                    branch.conflict.deletedAncestors = null;
                }
            })
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
