import { selectBranch } from '../../../features/branch/branches.selectors';
import useBranchContext from '../../../features/branch/hooks/useBranchContext';
import CommitNodes from '../../../features/contribution-requests/components/commits/CommitNodes';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function ContributionRequestCommits() {
    const { branchId } = useBranchContext();
    const branch = useSelector(selectBranch(branchId));
    const {
        createdNodes, restoredNodes, editedTitleNodes, deletedNodes, editedDescriptionNodes,
        reorderedNodes: reorderedNodesData,
    } = useMemo(() => {
        return branch ?? {};
    }, [branch]);

    const reorderedNodes = useMemo(() => {
        return new Set(reorderedNodesData?.map((data) => data.id));
    }, [reorderedNodesData]);

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
            <CommitNodes ids={createdNodes} title="Created Nodes" />
            <CommitNodes ids={restoredNodes} title="Restored Nodes" />
            <CommitNodes ids={editedTitleNodes} title="Edited Title Nodes" />
            <CommitNodes ids={editedDescriptionNodes} title="Edited Description Nodes" />
            <CommitNodes ids={deletedNodes} title="Deleted Nodes" />
            <CommitNodes ids={reorderedNodes} title="Reordered Nodes" />
        </Box>
    );
}
