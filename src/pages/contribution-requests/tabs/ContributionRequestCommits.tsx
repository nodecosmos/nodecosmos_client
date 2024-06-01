import { selectBranch } from '../../../features/branch/branches.selectors';
import useBranchContext from '../../../features/branch/hooks/useBranchContext';
import CommitNodes from '../../../features/contribution-requests/components/commits/CommitNodes';
import CommitWorkflowObjectsWrapper
, { WorkflowObjectType } from '../../../features/contribution-requests/components/commits/CommitWorkflowObjects';
import { indexWorkflowBranchData } from '../../../features/workflows/worfklow.thunks';
import { NodecosmosDispatch } from '../../../store';
import { Box } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ContributionRequestCommits() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const {
        branchId, nodeId, originalId,
    } = useBranchContext();
    const branch = useSelector(selectBranch(branchId));
    const {
        createdNodes, restoredNodes, editedTitleNodes, deletedNodes, editedDescriptionNodes,
        reorderedNodes: reorderedNodesData, createdWorkflowInitialInputs, deletedWorkflowInitialInputs,
    } = useMemo(() => {
        return branch ?? {};
    }, [branch]);

    const createdInitialInputs = useMemo(() => {
        return createdWorkflowInitialInputs ? new Set(
            Object.values(createdWorkflowInitialInputs).flatMap(set => Array.from(set)),
        ) : null;
    }, [createdWorkflowInitialInputs]);

    const deletedInitialInputs = useMemo(() => {
        return deletedWorkflowInitialInputs ? new Set (
            Object.values(deletedWorkflowInitialInputs).flatMap(set => Array.from(set)),
        ) : null;
    }, [deletedWorkflowInitialInputs]);

    const reorderedNodes = useMemo(() => {
        return new Set(reorderedNodesData?.map((data) => data.id));
    }, [reorderedNodesData]);

    useEffect(() => {
        dispatch(indexWorkflowBranchData({
            branchId,
            nodeId,
            rootId: originalId,
        }));
    }, [dispatch, branchId, nodeId, originalId]);

    return (
        <Box sx={{
            height: 1,
            overflow: 'auto',
            '.NodeButton': {
                ml: 1,
                mt: 2,
                borderRadius: 1,
                px: 2,
                py: 2,
            },
            '.NodeButtonText': { ml: 2 },
            '.MuiChip-root': { ml: 1 },
        }}>
            <CommitNodes ids={createdNodes} title="Created Nodes" showBlank />
            <CommitNodes ids={restoredNodes} title="Restored Nodes" />
            <CommitNodes ids={editedTitleNodes} title="Edited Title Nodes" />
            <CommitNodes ids={editedDescriptionNodes} title="Edited Description Nodes" />
            <CommitNodes ids={deletedNodes} title="Deleted Nodes" showBlank />
            <CommitNodes ids={reorderedNodes} title="Reordered Nodes" />
            <CommitWorkflowObjectsWrapper
                title="Created Workflow Initial Inputs"
                ids={createdInitialInputs}
                objectType={WorkflowObjectType.InputOutput} />
            <CommitWorkflowObjectsWrapper
                title="Deleted Workflow Initial Inputs"
                ids={deletedInitialInputs}
                objectType={WorkflowObjectType.InputOutput} />
        </Box>
    );
}
