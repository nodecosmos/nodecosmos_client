import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranch: boolean;
    branchedId: (id: UUID) => UUID; // returns either id of the object or branchId
}

export default function useBranchParams(): UseBranchParams {
    const { id: mainBranchId } = useParams<{ id: UUID }>();
    let { contributionRequestId: branchId } = useParams<{ contributionRequestId: UUID }>();
    const isBranch = !!branchId && mainBranchId !== branchId;

    if (!branchId) {
        branchId = mainBranchId as UUID;
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
        mainBranchId: mainBranchId as UUID,
        branchId,
        branchedId,
    };
}
