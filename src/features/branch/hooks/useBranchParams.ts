import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { selectOptNode } from '../../nodes/nodes.selectors';
import { getBranchNodeId } from '../branches.thunks';
import { BranchParams } from '../branches.types';
import {
    useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

interface UseBranchParams extends BranchParams {
    isContributionRequest: boolean;
    isBranch: boolean;
    nodeId: UUID;
    branchNodeId: UUID | null;
}

export default function useBranchParams(): UseBranchParams {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { originalId, id: nodeId } = useParams<{ originalId: UUID, id: UUID }>();
    let { branchId } = useParams<{ branchId: UUID }>();
    const [branchNodeId, setBranchNodeId] = useState<UUID | null>(null);

    if (!branchId) {
        branchId = originalId as UUID;
    }

    const node = useSelector(selectOptNode(originalId as UUID, nodeId));
    const location = useLocation();
    const isContributionRequest = useMemo(
        () => location.pathname.includes('/contribution_requests/'), [location.pathname],
    );
    const isBranch = isContributionRequest || ((node || false) && node.rootId !== originalId);

    useEffect(() => {
        if (isBranch && branchId && !isContributionRequest) {
            dispatch(getBranchNodeId(branchId)).then((action) => {
                if (getBranchNodeId.fulfilled.match(action)) {
                    setBranchNodeId(action.payload);
                }
            });
        }
    }, [branchId, dispatch, isBranch, isContributionRequest]);

    return {
        isBranch,
        isContributionRequest,
        originalId: isBranch && node ? node.rootId : originalId as UUID,
        branchId,
        nodeId: nodeId as UUID,
        branchNodeId,
    };
}
