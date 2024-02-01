import useNodeContext from './useNodeContext';
import { selectBranch, selectConflict } from '../../../../branch/branches.selectors';
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
    const conflict = useSelector(selectConflict(treeBranchId));
    const {
        deletedNodes,
        createdNodes,
    } = branch ?? {};
    const {
        deletedAncestors,
        deletedEditedNodes,
    } = conflict ?? {};

    console.log(deletedEditedNodes);

    return useMemo(() => {
        return {
            isCreated: createdNodes?.has(id) ?? false,
            isDeleted: deletedNodes?.has(id) ?? false,
            isOriginalDeleted: (deletedAncestors?.has(id) || deletedEditedNodes?.has(id)) ?? false,
        };
    }, [createdNodes, deletedAncestors, deletedEditedNodes, deletedNodes, id]);
}
