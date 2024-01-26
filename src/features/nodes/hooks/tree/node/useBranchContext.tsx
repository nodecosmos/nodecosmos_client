import useNodeContext from './useNodeContext';
import { selectBranch, selectDeletedAncestors } from '../../../../branch/branches.selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export interface BranchChanges {
    isCreated: boolean;
    isDeleted: boolean;
    isOriginalDeleted: boolean;
}

export default function useBranchContext(): BranchChanges {
    const { treeBranchId, id } = useNodeContext();
    const branch = useSelector(selectBranch(treeBranchId));
    const deletedAncestors = useSelector(selectDeletedAncestors(treeBranchId));

    return useMemo(() => {
        return {
            isCreated: branch?.createdNodes?.has(id) ?? false,
            isDeleted: branch?.deletedNodes?.has(id) ?? false,
            isOriginalDeleted: deletedAncestors?.has(id) ?? false,
        };
    }, [branch?.createdNodes, branch?.deletedNodes, deletedAncestors, id]);
}
