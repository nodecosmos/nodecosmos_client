import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { maybeSelectNode } from '../../nodes/nodes.selectors';
import { maybeSelectBranch } from '../branches.selectors';
import { showBranch } from '../branches.thunks';
import { BranchParams, BranchStatus } from '../branches.types';
import {
    createContext, useContext,
    useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

interface BranchContextValue extends BranchParams {
    isContributionRequest: boolean;
    isBranch: boolean;
    isMerged: boolean;
    nodeId: UUID;
    branchNodeId?: UUID;
    ownerId?: UUID;
    editorIds?: UUID[];
}

const BranchContext = createContext<BranchContextValue>({} as BranchContextValue);

export function useBranchContextCreator() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const { originalId, id: nodeId } = useParams<{ originalId: UUID, id: UUID }>();
    let { branchId } = useParams<{ branchId: UUID }>();

    if (!branchId) {
        branchId = originalId as UUID;
    }

    const branch = useSelector(maybeSelectBranch(branchId));
    const {
        nodeId: branchNodeId,
        status: branchStatus,
        ownerId,
        editorIds,
    } = branch || {};
    const node = useSelector(maybeSelectNode(originalId as UUID, nodeId));
    const { pathname } = useLocation();
    const isContributionRequest = useMemo(
        () => {
            return pathname.includes('/contribution_requests/');
        }, [pathname],
    );
    const isBranchedNode = (node ? node.rootId !== originalId : false);
    const isBranch = isContributionRequest || (node ? node.rootId !== originalId : false);

    useEffect(() => {
        if (isBranchedNode && !isContributionRequest && !branchNodeId) {
            dispatch(showBranch(branchId));
        }
    }, [branchId, branchNodeId, dispatch, isBranchedNode, isContributionRequest]);

    return {
        BranchContext,
        ctxValue: {
            isBranch,
            isContributionRequest,
            originalId: (isBranch && node) ? node.rootId : originalId as UUID,
            branchId,
            nodeId: nodeId as UUID,
            branchNodeId,
            isMerged: branchStatus === BranchStatus.Merged,
            ownerId,
            editorIds,
        },
    };
}

export default function useBranchContext(): BranchContextValue {
    return useContext(BranchContext);
}
