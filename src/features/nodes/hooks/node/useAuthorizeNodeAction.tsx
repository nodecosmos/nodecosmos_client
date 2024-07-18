import { setAlert } from '../../../app/appSlice';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { selectCurrentUser } from '../../../users/users.selectors';
import { selectNode } from '../../nodes.selectors';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useAuthorizeNodeAction(): () => boolean {
    const dispatch = useDispatch();
    const {
        nodeId, branchId, isBranch, isContributionRequest, ownerId: branchOwnerId, editorIds: branchEditors, isMerged,
    } = useBranchContext();
    const node = useSelector(selectNode(branchId, nodeId));
    const currentUser = useSelector(selectCurrentUser);

    return useCallback(() => {
        if (isMerged) {
            dispatch(setAlert({
                isOpen: true,
                message: 'This node has been merged and cannot be edited.',
                severity: 'info',
            }));
            return false;
        }

        const canEditNode = !isBranch
            && currentUser
            && (node?.ownerId === currentUser.id || node?.editorIds?.has(currentUser.id));
        const canEditBranch = isBranch
            && currentUser
            && (branchOwnerId === currentUser.id || branchEditors?.has(currentUser.id));

        if (!currentUser || !(canEditNode || canEditBranch)) {
            let message = `You do not have permission to edit this 
                           ${isContributionRequest ? '<b>Contribution Request</b>' : '<b>Node</b>'}. `;

            if (!currentUser) {
                message += 'Please sign in to edit nodes or to submit a <b>Contribution Request</b>.';
            }
            else if (isContributionRequest || isBranch) {
                message += `You can request author to add you as 
                            <b>editor</b> to node or submit your own Contribution Request.`;
            }
            else {
                message += 'If you wish to suggest changes, please submit a Contribution Request.';
            }

            dispatch(setAlert({
                isOpen: true,
                message,
                severity: 'error',
            }));
            return false;
        }

        return true;
    },
    [
        branchEditors, branchOwnerId, currentUser, dispatch, isBranch, isContributionRequest, isMerged,
        node?.editorIds, node?.ownerId,
    ]);
}

export function useIsAuthorized(): boolean {
    const {
        nodeId, branchId, isBranch, ownerId: branchOwnerId, editorIds: branchEditors,
    } = useBranchContext();
    const node = useSelector(selectNode(branchId, nodeId));
    const currentUser = useSelector(selectCurrentUser);

    return useMemo(() => {
        const canEditNode = !isBranch
                && currentUser
                && (node?.ownerId === currentUser.id || node?.editorIds?.has(currentUser.id));
        const canEditBranch = isBranch
                && currentUser
                && (branchOwnerId === currentUser.id || branchEditors?.has(currentUser.id));

        return !(!currentUser || !(canEditNode || canEditBranch));
    },
    [branchEditors, branchOwnerId, currentUser, isBranch, node?.editorIds, node?.ownerId]);
}
