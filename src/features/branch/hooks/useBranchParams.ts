import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranch: boolean;
    branchedId: (id: UUID) => UUID; // returns either id of the object or branchId
}

export default function useBranchParams(): UseBranchParams {
    const { id: currentOriginalBranchId } = useParams<{ id: UUID }>();
    let { branchId: currentBranchId } = useParams<{ branchId: UUID }>();
    const isBranch = !!currentBranchId && currentOriginalBranchId !== currentBranchId;

    if (!currentBranchId) {
        currentBranchId = currentOriginalBranchId as UUID;
    }

    const branchedId = useCallback((id: UUID) => {
        if (isBranch) {
            return currentBranchId as UUID;
        } else {
            return id;
        }
    }, [currentBranchId, isBranch]);

    return {
        isBranch,
        currentOriginalBranchId: currentOriginalBranchId as UUID,
        currentBranchId,
        branchedId,
    };
}
