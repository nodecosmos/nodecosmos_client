import useNodeContext from './useNodeContext';
import { selectBranch, selectConflict } from '../../../branch/branches.selectors';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export interface BranchChanges {
    isCreated: boolean;
    isDeleted: boolean;
    isAncestorDeleted: boolean;
    isOriginalDeleted: boolean;
    isReordered: boolean;
    isDescriptionEdited: boolean;
    isTitleEdited: boolean;
    isEdited: boolean;
}

export default function useNodeBranchContext(): BranchChanges | null {
    const { isBranch } = useBranchContext();
    const {
        branchId, id, ancestorIds,
    } = useNodeContext();
    const branch = useSelector(selectBranch(branchId));
    const conflict = useSelector(selectConflict(branchId));
    const {
        deletedNodes,
        createdNodes,
        editedNodes,
        reorderedNodes,
        editedDescriptionNodes,
        editedTitleNodes,
    } = useMemo(() => {
        return branch ?? {};
    }, [branch]);

    const {
        deletedAncestors: deletedAncestorConflict,
        deletedEditedNodes,
    } = useMemo(() => {
        return conflict ?? {};
    }, [conflict]);

    return useMemo(() => {
        if (!isBranch) return null;

        const isAncestorDeleted = (
            deletedNodes && ancestorIds?.some((ancestorId) => deletedNodes?.has(ancestorId))
        ) ?? false;

        return {
            isCreated: createdNodes?.has(id) ?? false,
            isDeleted: (deletedNodes
                && (
                    deletedNodes?.has(id)
                    || isAncestorDeleted
                )
            ) ?? false,
            isAncestorDeleted: isAncestorDeleted ?? false,
            isReordered: reorderedNodes?.some((reorder) => reorder.id === id) ?? false,
            isOriginalDeleted: (deletedAncestorConflict?.has(id) || deletedEditedNodes?.has(id)) ?? false,
            isDescriptionEdited: editedDescriptionNodes?.has(id) ?? false,
            isTitleEdited: editedTitleNodes?.has(id) ?? false,
            isEdited: editedNodes?.has(id) ?? false,
        };
    }, [
        isBranch,
        ancestorIds,
        createdNodes,
        deletedAncestorConflict,
        deletedEditedNodes,
        deletedNodes,
        editedDescriptionNodes,
        id,
        reorderedNodes,
        editedTitleNodes,
        editedNodes,
    ]);
}
