import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranched: boolean;
}

export default function useBranchParams(): UseBranchParams {
    const { id: mainBranchId } = useParams<{ id: UUID }>();
    let { contributionRequestId: branchId } = useParams<{ contributionRequestId: UUID }>();

    if (!branchId) {
        branchId = mainBranchId as UUID;
    }

    return {
        isBranched: mainBranchId !== branchId,
        mainBranchId: mainBranchId as UUID,
        branchId,
    };
}
