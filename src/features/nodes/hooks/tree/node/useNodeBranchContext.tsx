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
        treeBranchId, id, ancestorIds,
    } = useNodeContext();
    const branch = useSelector(selectBranch(treeBranchId));
    const conflict = useSelector(selectConflict(treeBranchId));
    const {
        deletedNodes,
        createdNodes,
        reorderedNodes,
        editedNodeDescriptions,
        editedNodeTitles,
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
            isDescriptionEdited: editedNodeDescriptions?.has(id) ?? false,
            isTitleEdited: editedNodeTitles?.has(id) ?? false,
        };
    }, [
        ancestorIds,
        createdNodes,
        deletedAncestorConflict,
        deletedEditedNodes,
        deletedNodes,
        editedNodeDescriptions,
        id,
        reorderedNodes,
        editedNodeTitles,
    ]);
}
