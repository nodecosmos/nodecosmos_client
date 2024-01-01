import { UUID } from '../../../../../../types';
import { selectBranch } from '../../../../../branch/branches.selectors';
import { selectBranchNodes } from '../../../../nodes.selectors';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export interface BranchChanges {
    isCreated: boolean;
    isDeleted: boolean;
    isOriginalDeleted: boolean;
}

export default function useBranchChanges(treeBranchId: UUID, id: UUID): BranchChanges {
    const { id: originalTreeBranchId } = useParams() as { id: UUID };
    const branch = useSelector(selectBranch(treeBranchId));
    const originalBranchNodes = useSelector(selectBranchNodes(originalTreeBranchId));

    return useMemo(() => {
        let isCreated = false, isDeleted = false, isOriginalDeleted = false;

        if (branch?.createdNodes?.has(id)) {
            isCreated = true;
        } else if (branch?.deletedNodes?.has(id)) {
            isDeleted = true;
        } else if (originalBranchNodes && !originalBranchNodes[id]) {
            isOriginalDeleted = true;
        }

        return {
            isCreated,
            isDeleted,
            isOriginalDeleted,
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [branch?.createdNodes, branch?.deletedNodes, id]);
}
