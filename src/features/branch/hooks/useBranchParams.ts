import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranch: boolean;
    branchedId: (id: UUID) => UUID; // returns either id of the object or branchId
}

export default function useBranchParams(): UseBranchParams {
    const { id: currentRootId } = useParams<{ id: UUID }>();
    let { branchId: branchId } = useParams<{ branchId: UUID }>();
    const isBranch = !!branchId && currentRootId !== branchId;

    if (!branchId) {
        branchId = currentRootId as UUID;
    }

    const branchedId = useCallback((id: UUID) => {
        if (isBranch) {
            return branchId as UUID;
        } else {
            return id;
        }
    }, [branchId, isBranch]);

    return {
        isBranch,
        currentRootId: currentRootId as UUID,
        branchId,
        branchedId,
    };
}
