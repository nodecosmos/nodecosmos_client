import { UUID } from '../../../types';
import { BranchParams } from '../branches.types';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranch: boolean;
    nodeId: UUID;
}

export default function useBranchParams(): UseBranchParams {
    const { originalId, id: nodeId } = useParams<{ originalId: UUID, id: UUID }>();
    let { branchId } = useParams<{ branchId: UUID }>();
    const isBranch = !!branchId;

    if (!branchId) {
        branchId = originalId as UUID;
    }

    return {
        isBranch,
        originalId: originalId as UUID,
        branchId,
        nodeId: nodeId as UUID,
    };
}
