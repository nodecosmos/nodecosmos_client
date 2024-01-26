import { checkDeletedAncestorConflict } from './branches.thunks';
import { BranchesState, ConflictStatus } from './branches.types';
import { showContributionRequest } from '../contribution-requests/contributionRequests.thunks';
import {
    create, deleteNode, updateDescription, updateTitle,
} from '../nodes/nodes.thunks';
import { createSlice } from '@reduxjs/toolkit';

const initialState: BranchesState = { byId: {} };

const branchesSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(showContributionRequest.fulfilled, (state, action) => {
                const { branch } = action.payload;
                const { conflict } = branch;

                state.byId[branch.id] = {
                    id: branch.id,
                    title: branch.title,
                    description: branch.description,
                    ownerId: branch.ownerId,
                    owner: branch.owner,
                    editorIds: branch.editorIds,
                    isContributionRequest: branch.isContributionRequest,
                    createdNodes: new Set(branch.createdNodes),
                    deletedNodes: new Set(branch.deletedNodes),
                    editedNodeTitles: new Set(branch.editedNodeTitles),
                    editedNodeDescriptions: new Set(branch.editedNodeDescriptions),
                    editedNodeTreePositions: new Set(branch.editedNodeTreePositions),
                    createdWorkflows: new Set(branch.createdWorkflows),
                    deletedWorkflows: new Set(branch.deletedWorkflows),
                    editedWorkflowTitles: new Set(branch.editedWorkflowTitles),
                    createdFlows: new Set(branch.createdFlows),
                    deletedFlows: new Set(branch.deletedFlows),
                    editedFlowTitles: new Set(branch.editedFlowTitles),
                    editedFlowDescriptions: new Set(branch.editedFlowDescriptions),
                    createdIos: new Set(branch.createdIos),
                    deletedIos: new Set(branch.deletedIos),
                    editedIoTitles: new Set(branch.editedIoTitles),
                    editedIoDescriptions: new Set(branch.editedIoDescriptions),
                    createdFlowSteps: new Set(branch.createdFlowSteps),
                    deletedFlowSteps: new Set(branch.deletedFlowSteps),
                    createdFlowStepInputsByNode: branch.createdFlowStepInputsByNode,
                    deletedFlowStepInputsByNode: branch.deletedFlowStepInputsByNode,
                    conflict: conflict && {
                        status: conflict.status,
                        deletedAncestors: new Set(conflict.deletedAncestors),
                    },
                };
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
                    };
                } else if (branch.conflict && !hasNewConflicts) {
                    branch.conflict.status = ConflictStatus.Resolved;
                    branch.conflict.deletedAncestors = null;
                }
            });
    },
});

const { reducer } = branchesSlice;

export default reducer;
