import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useParams } from 'react-router-dom';

export default function useBranchParams(): BranchParams {
    const { id: mainBranchId } = useParams<{ id: UUID }>();
    let { contributionRequestId: branchId } = useParams<{ contributionRequestId: UUID }>();

    if (!branchId) {
        branchId = mainBranchId as UUID;
    }

    return {
        mainBranchId: mainBranchId as UUID,
        branchId,
    };
}
