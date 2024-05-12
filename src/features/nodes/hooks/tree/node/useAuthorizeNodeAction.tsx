import { setAlert } from '../../../../app/appSlice';
import useBranchContext from '../../../../branch/hooks/useBranchContext';
import { selectCurrentUser } from '../../../../users/users.selectors';
import { selectNode } from '../../../nodes.selectors';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useAuthorizeNodeAction(): () => boolean {
    const dispatch = useDispatch();
    const {
        nodeId, branchId, isContributionRequest, ownerId: branchOwnerId, editorIds: branchEditors,
    } = useBranchContext();
    const node = useSelector(selectNode(branchId, nodeId));
    const currentUser = useSelector(selectCurrentUser);
    const canEditNode = !isContributionRequest
        && currentUser
        && (node?.ownerId === currentUser.id || node?.editorIds?.includes(currentUser.id));
    const canEditBranch = isContributionRequest
        && currentUser
        && (branchOwnerId === currentUser.id || branchEditors?.includes(currentUser.id));

    return useCallback(() => {
        if (!currentUser || !(canEditNode || canEditBranch)) {
            let message = `You do not have permission to edit this 
                           ${isContributionRequest ? '<b>Contribution Request</b>' : 'Node'}. `;

            if (!currentUser) {
                message += 'Please sign in to edit nodes.';
            }
            else if (isContributionRequest) {
                message += `You can request author to add you as 
                            <b>contributor</b> or submit your own Contribution Request.`;
            }
            else {
                message += 'If you wish to suggest changes, please submit a Contribution Request.';
            }

            dispatch(setAlert({
                isOpen: true,
                message,
                severity: 'warning',
            }));
            return false;
        }

        return true;
    }, [canEditBranch, canEditNode, currentUser, dispatch, isContributionRequest]);
}
