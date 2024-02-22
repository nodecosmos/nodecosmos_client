import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranched: boolean;
    branchedId: (id: UUID) => UUID; // returns either id of the object or branchId
}

export default function useBranchParams(): UseBranchParams {
    const { id: mainBranchId } = useParams<{ id: UUID }>();
    let { contributionRequestId: branchId } = useParams<{ contributionRequestId: UUID }>();
    const isBranched = mainBranchId !== branchId;

    if (!branchId) {
        branchId = mainBranchId as UUID;
    }

    const branchedId = useCallback((id: UUID) => {
        if (isBranched) {
            return branchId as UUID;
        } else {
            return id;
        }
    }, [branchId, isBranched]);

    return {
        isBranched,
        mainBranchId: mainBranchId as UUID,
        branchId,
        branchedId,
    };
}
