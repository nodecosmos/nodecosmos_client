import { NodecosmosDispatch } from '../../../store';
import { UUID } from '../../../types';
import { maybeSelectNode } from '../../nodes/nodes.selectors';
import { maybeSelectBranch } from '../branches.selectors';
import { showBranch } from '../branches.thunks';
import {
    Branch, BranchParams, BranchStatus, 
} from '../branches.types';
import {
    createContext, useContext,
    useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useLocation, useParams, useSearchParams,
} from 'react-router-dom';

interface BranchContextValue extends BranchParams {
    isContributionRequest: boolean;
    isBranch: boolean;
    isMerged: boolean;
    nodeId: UUID;
    branchNodeId?: UUID;
    ownerId?: UUID;
    editorIds?: Set<UUID>;
}

const BranchContext = createContext<BranchContextValue>({} as BranchContextValue);

export function useBranchContextCreator() {
    const dispatch: NodecosmosDispatch = useDispatch();

    // extract initial branch data from url path
    const { id: nodeId } = useParams<{ originalId: UUID, id: UUID }>();
    let { originalId, branchId } = useParams<{ originalId: UUID, branchId: UUID }>();

    if (!branchId) {
        branchId = originalId as UUID;
    }

    // extract branch data from query params if they exist
    const [searchParams] = useSearchParams();
    const isBranchQ = searchParams.get('isBranchQ') === 'true';
    const originalIdQ = searchParams.get('originalIdQ');

    if (isBranchQ && originalIdQ) {
        originalId = originalIdQ as UUID;
    }

    const branch = useSelector(maybeSelectBranch(branchId));
    const {
        nodeId: branchNodeId,
        status: branchStatus,
        ownerId,
        editorIds,
    } = useMemo(() => (branch ?? {} as Branch), [branch]);
    const node = useSelector(maybeSelectNode(originalId as UUID, nodeId));
    const { pathname } = useLocation();
    const isContributionRequest = useMemo(
        () => {
            return pathname.includes('/contribution_requests/');
        }, [pathname],
    );
    const isBranchedNode = (node ? node.rootId !== originalId : false);
    const isBranch = isBranchQ || isContributionRequest || (node ? node.rootId !== originalId : false);

    useEffect(() => {
        if ((isBranchedNode || isBranchQ) && !isContributionRequest && !branchNodeId) {
            dispatch(showBranch(branchId));
        }
    }, [branchId, branchNodeId, dispatch, isBranchQ, isBranchedNode, isContributionRequest]);

    return useMemo(() => ({
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
    }),
    [
        branchId, branchNodeId, branchStatus, editorIds, isBranch, isContributionRequest, node, nodeId, originalId,
        ownerId,
    ]);
}

export default function useBranchContext(): BranchContextValue {
    return useContext(BranchContext);
}
