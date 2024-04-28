import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranch: boolean;
    branchedId: (id: UUID) => UUID; // returns either id of the object or branchId
}

export default function useBranchParams(): UseBranchParams {
    const { originalId } = useParams<{ originalId: UUID }>();
    let { branchId } = useParams<{ branchId: UUID }>();
    const isBranch = !!branchId;

    if (!branchId) {
        branchId = originalId as UUID;
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
        originalId: originalId as UUID,
        branchId,
        branchedId,
    };
}
