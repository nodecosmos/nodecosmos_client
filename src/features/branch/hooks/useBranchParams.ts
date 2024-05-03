import { UUID } from '../../../types';
import { selectOptNode } from '../../nodes/nodes.selectors';
import { BranchParams } from '../branches.types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isBranch: boolean;
    nodeId: UUID;
}

export default function useBranchParams(): UseBranchParams {
    const { originalId, id: nodeId } = useParams<{ originalId: UUID, id: UUID }>();
    let { branchId } = useParams<{ branchId: UUID }>();

    if (!branchId) {
        branchId = originalId as UUID;
    }

    const node = useSelector(selectOptNode(originalId as UUID, nodeId));
    const isBranch = (node || false) && node.rootId !== originalId;

    return {
        isBranch,
        originalId: isBranch && node ? node.rootId : originalId as UUID,
        branchId,
        nodeId: nodeId as UUID,
    };
}
