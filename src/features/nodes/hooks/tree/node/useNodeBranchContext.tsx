import useNodeContext from './useNodeContext';
import { selectBranch, selectConflict } from '../../../../branch/branches.selectors';
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
}

export default function useNodeBranchContext(): BranchChanges {
    const {
        currentBranchId, id, ancestorIds,
    } = useNodeContext();
    const branch = useSelector(selectBranch(currentBranchId));
    const conflict = useSelector(selectConflict(currentBranchId));
    const {
        deletedNodes,
        createdNodes,
        reorderedNodes,
        editedDescriptionNodes,
        editedTitleNodes,
    } = branch ?? {};
    const {
        deletedAncestors: deletedAncestorConflict,
        deletedEditedNodes,
    } = conflict ?? {};

    return useMemo(() => {
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
        };
    }, [
        ancestorIds,
        createdNodes,
        deletedAncestorConflict,
        deletedEditedNodes,
        deletedNodes,
        editedDescriptionNodes,
        id,
        reorderedNodes,
        editedTitleNodes,
    ]);
}
